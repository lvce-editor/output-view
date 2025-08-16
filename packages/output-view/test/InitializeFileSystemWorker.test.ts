import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { initializeFileSystemWorker } from '../src/parts/InitializeFileSystemWorker/InitializeFileSystemWorker.ts'

test('initializeFileSystemWorker registers FileSystemWorker RPC', async () => {
  // Create a mock RPC
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  // Mock the FileSystemWorker.set method to track calls
  const originalSet = FileSystemWorker.set
  FileSystemWorker.set = jest.fn()

  try {
    // Call the initialization function
    await initializeFileSystemWorker()

    // Verify that FileSystemWorker.set was called
    expect(FileSystemWorker.set).toHaveBeenCalled()
  } finally {
    // Restore the original method
    FileSystemWorker.set = originalSet
  }
})

test('initializeFileSystemWorker completes successfully', async () => {
  // Create a mock RPC
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readFile') {
        return Promise.resolve('file content')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  // Mock the FileSystemWorker.set method
  const originalSet = FileSystemWorker.set
  FileSystemWorker.set = jest.fn()

  try {
    // Call the initialization function
    await expect(initializeFileSystemWorker()).resolves.toBeUndefined()

    // Verify that FileSystemWorker.set was called
    expect(FileSystemWorker.set).toHaveBeenCalled()
  } finally {
    // Restore the original method
    FileSystemWorker.set = originalSet
  }
})
