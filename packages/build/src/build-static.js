import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/output-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/outputViewWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)
const staticOutputViewWorkerPath = join(root, 'dist', commitHash, 'packages', 'output-view', 'dist', 'outputViewWorkerMain.js')

const occurrence = `// const outputViewWorkerUrl = \`\${assetDir}/packages/output-view/dist/outputViewWorkerMain.js\`
const outputViewWorkerUrl = \`${remoteUrl}\``
const replacement = `const outputViewWorkerUrl = \`\${assetDir}/packages/output-view/dist/outputViewWorkerMain.js\``
if (content.includes(occurrence)) {
  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerPath, newContent)
}

await cp(workerPath, staticOutputViewWorkerPath)
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
