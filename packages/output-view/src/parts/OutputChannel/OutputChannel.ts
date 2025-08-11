import * as SharedProcess from '../SharedProcess/SharedProcess.ts'

export const open = async (id: string, file: string): Promise<void> => {
  await SharedProcess.invoke(/* OutputChannel.open */ 'OutputChannel.open', id, /* path */ file)
}

export const close = async (id: string): Promise<void> => {
  await SharedProcess.invoke(/* OutputChannel.close */ 'OutputChannel.close', /* id */ id)
}
