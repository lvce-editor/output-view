import type { Option } from '../Option/Option.ts'

export const loadOptions = async (platform: number): Promise<readonly Option[]> => {
  return [
    {
      id: 'Main',
      uri: 'file:///tmp/log-main-process.txt',
    },
    {
      id: 'shared',
      uri: 'File:///tmp/log-shared-process.txt',
    },
  ]
}
