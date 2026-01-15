export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'performance-test',
    label: 'Performance Test'
  })
  
  channel.append('PERFORMANCE TEST START\n')
  
  // Test 1: Large number of small writes
  for (let i = 0; i < 1000; i++) {
    channel.append(`Chunk ${i + 1}: ${'x'.repeat(100)}\n`)
  }
  
  channel.append('PERFORMANCE MILESTONE: 1000 chunks written\n')
  
  // Test 2: Medium number of medium writes
  for (let i = 0; i < 100; i++) {
    channel.append(`Medium chunk ${i + 1}: ${'y'.repeat(1000)}\n`)
  }
  
  channel.append('PERFORMANCE MILESTONE: 100 medium chunks written\n')
  
  // Test 3: Small number of large writes
  for (let i = 0; i < 10; i++) {
    channel.append(`Large chunk ${i + 1}: ${'z'.repeat(10000)}\n`)
  }
  
  channel.append('PERFORMANCE MILESTONE: 10 large chunks written\n')
  
  // Test 4: Mixed sizes
  for (let i = 0; i < 500; i++) {
    const size = (i % 10) * 100 + 50
    channel.append(`Mixed ${i}: ${'m'.repeat(size)}\n`)
  }
  
  channel.append('PERFORMANCE MILESTONE: 500 mixed chunks written\n')
  
  // Test 5: Rapid succession
  const startTime = Date.now()
  for (let i = 0; i < 2000; i++) {
    channel.append(`Rapid ${i}: ${i.toString().padStart(4, '0')}\n`)
  }
  const endTime = Date.now()
  
  channel.append(`PERFORMANCE MILESTONE: 2000 rapid chunks written in ${endTime - startTime}ms\n`)
  
  channel.append('PERFORMANCE TEST COMPLETE\n')
}
