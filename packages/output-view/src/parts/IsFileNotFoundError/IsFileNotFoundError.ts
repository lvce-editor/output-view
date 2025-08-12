export const isFileNotFoundError = (error: any): boolean => {
  return error.message.includes('File not found')
}
