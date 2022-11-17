/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Book } from '../types/books'
import { renderHook } from '@testing-library/react'
import { ActionTypes, PutAllValuesInStore, UpdateValueInStore } from '../actions/BaseActions'
import { dummyBookResponse, updatedValue } from './testUtil'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useOrchestrated } = require('../hooks/useOrchestrated')

describe('the useOrchestrated hook', () => {
  it('Calls the API only once', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    // @ts-ignore
    const { result } = renderHook(() => useOrchestrated<Book>({ pathName: 'books' }))

    for (let i = 0; i < 1000; i++) {
      await result.current?.getAll()
    }

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Can perform multiple dispatches', async () => {
    /**  Since useOrchestrated has been exported as a module, and we are using require to import it,
        We do not get the correct types back*/

    // @ts-ignore
    const { result } = renderHook(() => useOrchestrated<Book>({ pathName: 'books' }))

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const store = result.current?.getStore()

    if (store) {
      PutAllValuesInStore({
        payload: dummyBookResponse,
        store: store,
        state: store.getState(),
        type: ActionTypes.GET_ALL
      })

      for (let i = 0; i < 10000; i++) {
        UpdateValueInStore({
          payload: updatedValue,
          store: store,
          state: store.getState(),
          type: ActionTypes.UPDATE
        })
      }
    }
  })
})
