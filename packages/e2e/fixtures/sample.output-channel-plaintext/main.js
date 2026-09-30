import { activate, createOutputChannel } from '@lvce-editor/api'

const channel = createOutputChannel('plaintext')
await activate()
await channel.append('Starting Dev Containers for file:///workspace/project')
