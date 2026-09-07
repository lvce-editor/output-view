import { activate, createOutputChannel, registerCommand } from '@lvce-editor/api'

const channel = createOutputChannel('auto-scroll')
await activate()
await channel.appendLine(Array.from({ length: 1000 }, (_, index) => `line ${index}`).join('\n'))
let nextLine = 1000
registerCommand({
  id: 'auto-scroll.append',
  async execute() {
    await channel.appendLine(`line ${nextLine++}`)
  },
})
