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

const occurrence = `\`${remoteUrl}\``
const replacement = '`${assetDir}/packages/output-view/dist/outputViewWorkerMain.js`'
if (!content.includes(occurrence)) {
  throw new Error('Could not find development output worker URL in static renderer')
}
await writeFile(rendererWorkerPath, content.replace(occurrence, replacement))

const indexPath = join(root, 'dist', 'index.html')
const indexContent = await readFile(indexPath, 'utf8')
const indexOccurrence = `"develop.outputViewWorkerPath": "${remoteUrl}"`
const indexReplacement = `"develop.outputViewWorkerPath": "/output-view/${commitHash}/packages/output-view/dist/outputViewWorkerMain.js"`
if (!indexContent.includes(indexOccurrence)) {
  throw new Error('Could not find development output worker URL in static configuration')
}
await writeFile(indexPath, indexContent.replace(indexOccurrence, indexReplacement))

await cp(workerPath, staticOutputViewWorkerPath)
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
