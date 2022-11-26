import { render } from '@testing-library/react'
import BookComponentContainer from '../components/BookComponentContainer'

describe('Context API calls', () => {
  it('Calls the API 1000 times', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock
    const { rerender } = render(<BookComponentContainer />)

    for (let i = 0; i < 1000; i++) {
      rerender(<BookComponentContainer />)
    }

    expect(fetch).toHaveBeenCalledTimes(1000)
  })
})
