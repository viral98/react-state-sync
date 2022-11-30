import { render } from '@testing-library/react'
import { createValue, dummyBookResponse, updatedValue } from '../../hooks/testUtil'
import BookComponentContainer from '../components/BookComponentContainer'
import { BookStore } from '../store/BookContext'
import {
  AddANewValueInStore,
  DeleteValueFromStore,
  PutAllValuesInStore,
  UpdateValueInStore
} from '../store/bookReducer'

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

  it('Can perform multiple dispatches', async () => {
    /**  Since useOrchestrated has been exported as a module, and we are using require to import it,
        We do not get the correct types back*/

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const store = BookStore

    if (store) {
      PutAllValuesInStore({
        payload: dummyBookResponse
      })

      for (let i = 0; i < 10000; i++) {
        UpdateValueInStore({
          payload: updatedValue
        })
      }
    }
  })

  it('Can handle multiple store manipulations', async () => {
    /**  Since useOrchestrated has been exported as a module, and we are using require to import it,
        We do not get the correct types back*/

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const store = BookStore

    if (store) {
      PutAllValuesInStore({
        payload: dummyBookResponse
      })
    }

    for (let i = 0; i < 10000; i++) {
      AddANewValueInStore({
        payload: createValue
      })

      UpdateValueInStore({
        payload: updatedValue
      })

      DeleteValueFromStore({
        payload: updatedValue
      })
    }
  })
})
