/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Book } from '../types/books'
import { renderHook } from '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useOrchestrated } = require('../hooks/useOrchestrated')

describe('the useOrchestrated hook', () => {
  it('Can be setup, and get.All can be called', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    // @ts-ignore
    renderHook(() => useOrchestrated<Book>({ pathName: 'books' }))

    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
