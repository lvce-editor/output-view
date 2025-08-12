export const getSelectedItem = (platform: number): string => {
  if (platform === /* Web */ 1) {
    return ''
  }
  return 'file:///tmp/log-main-process.txt'
}
