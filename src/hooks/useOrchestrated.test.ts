import { Book } from '../types/books'
import { useOrchestrated } from './useOrchestrated'
import { renderHook } from '@testing-library/react'

describe('the useOrchestrated hook', () => {
  it('Calls the API only once', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    const { result } = renderHook(() => useOrchestrated<Book>({ pathName: 'books' }))

    for (let i = 0; i < 1000; i++) {
      await result.current?.getAll()
    }

    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
