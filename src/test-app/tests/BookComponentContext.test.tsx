import { render } from '@testing-library/react'
import { dummyBookResponse, updatedValue } from '../../hooks/testUtil'
import { useBooks } from '../hooks/useBooks'
import { renderHook } from '@testing-library/react'
import { ActionTypes } from '../../actions/BaseActions'
import { act } from 'react-dom/test-utils'
import { NUMBER_OF_RUNS } from '../../tests/utils'
import BookComponentContainer from '../components/BookComponentContainer'

describe('Context API calls', () => {
  it('Calls the API 1000 times', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    for (let i = 0; i < NUMBER_OF_RUNS; i++) {
      render(<BookComponentContainer />)
    }

    expect(fetch).toHaveBeenCalledTimes(NUMBER_OF_RUNS)
  })

  it('Can perform multiple dispatches', async () => {
    /**  Since useOrchestrated has been exported as a module, and we are using require to import it,
        We do not get the correct types back*/

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const store = renderHook(() => useBooks())

    act(() => {
      if (store) {
        store.result.current.bookDispatch({
          type: ActionTypes.GET_ALL,
          payload: dummyBookResponse
        })

        for (let i = 0; i < NUMBER_OF_RUNS; i++) {
          store.result.current.bookDispatch({
            type: ActionTypes.UPDATE,
            payload: updatedValue
          })
        }
      }
    })
  })

  it('Can handle multiple store manipulations', async () => {
    /**  Since useOrchestrated has been exported as a module, and we are using require to import it,
        We do not get the correct types back*/

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const store = renderHook(() => useBooks())

    act(() => {
      if (store) {
        store.result.current.bookDispatch({
          type: ActionTypes.GET_ALL,
          payload: dummyBookResponse
        })
      }

      for (let i = 0; i < NUMBER_OF_RUNS; i++) {
        store.result.current.bookDispatch({
          type: ActionTypes.POST,
          payload: dummyBookResponse
        })

        store.result.current.bookDispatch({
          type: ActionTypes.UPDATE,
          payload: updatedValue
        })
        store.result.current.bookDispatch({
          type: ActionTypes.DELETE,
          payload: updatedValue
        })
      }
    })
  })
})
