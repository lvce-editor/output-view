export const activate = () => {
  // Extension declares output provider in JSON but doesn't register it in code
  // This should test the handling of declared but unregistered providers
  console.log('Extension activated but no output channel registered')
}
