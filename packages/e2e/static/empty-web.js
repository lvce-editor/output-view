import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../../dist/', import.meta.url))
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
}
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname
  const relativePath = pathname.replace(/^\/output-view/, '')
  const path = resolve(root, `.${relativePath === '/' ? '/index.html' : relativePath}`)
  if (!path.startsWith(root)) {
    response.writeHead(403).end()
    return
  }
  try {
    const content = await readFile(path)
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' }).end(content)
  } catch {
    response.writeHead(404).end()
  }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
let browser
try {
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  page.setDefaultTimeout(10000)
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })
  await page.goto(`http://127.0.0.1:${server.address().port}/output-view/`)
  await page.locator('.ActivityBar').waitFor()
  await page.getByText('View', { exact: true }).click()
  await page.getByRole('menuitem', { name: 'Output', exact: true }).click()
  await page.locator('.OutputContent').waitFor({ state: 'attached' })
  assert.equal(await page.locator('[name="output"] option').count(), 0)
  assert.equal(await page.locator('.OutputContent').textContent(), '')
  assert.equal(await page.locator('.Error').count(), 0)
  await page.locator('[name="Clear"]').click()
  await page.locator('[name="filter"]').fill('warning')
  await page.locator('.Panel').getByRole('button', { name: 'Close', exact: true }).click()
  await page.locator('.Output').waitFor({ state: 'hidden' })
  await page.getByText('View', { exact: true }).click()
  await page.getByRole('menuitem', { name: 'Output', exact: true }).click()
  await page.locator('.OutputContent').waitFor({ state: 'attached' })
  assert.equal(await page.locator('[name="output"] option').count(), 0)
  assert.equal(await page.locator('.OutputContent').textContent(), '')
  assert.equal(await page.locator('.Error').count(), 0)
  assert.deepEqual(errors, [])
  console.log('PASS static Web Output opens and reopens without channels')
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}
