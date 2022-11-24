import { render } from '@testing-library/react'
import BookComponentContainer from '../components/BookComponentContainer'

describe('Context API calls', () => {
  it('Calls the API 1000 times', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    for (let i = 0; i < 1000; i++) {
      render(<BookComponentContainer />)
    }

    expect(fetch).toHaveBeenCalledTimes(1000)
  })

  it('Calls the API 100 times', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    for (let i = 0; i < 100; i++) {
      render(<BookComponentContainer />)
    }

    expect(fetch).toHaveBeenCalledTimes(100)
  })

  it('Calls the API 10 times', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    for (let i = 0; i < 10; i++) {
      render(<BookComponentContainer />)
    }

    expect(fetch).toHaveBeenCalledTimes(10)
  })
})
