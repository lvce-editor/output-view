import { build } from 'esbuild'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { root } from './root.js'

const fixturesPath = join(root, 'packages', 'e2e', 'fixtures')

const buildE2eExtension = async (extensionName) => {
  const extensionPath = join(fixturesPath, extensionName)
  await build({
    bundle: true,
    entryPoints: [join(extensionPath, 'main.js')],
    external: ['electron', 'node:*'],
    format: 'esm',
    outfile: join(extensionPath, 'dist', 'main.js'),
    platform: 'browser',
    target: 'esnext',
  })
}

export const buildE2eExtensions = async () => {
  const entries = await readdir(fixturesPath, { withFileTypes: true })
  const extensionNames = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  await Promise.all(extensionNames.map(buildE2eExtension))
}
