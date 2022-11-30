/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Book } from '../types/books'
import { renderHook } from '@testing-library/react'
import {
  ActionTypes,
  AddANewValueInStore,
  DeleteValueFromStore,
  PutAllValuesInStore,
  UpdateValueInStore
} from '../actions/BaseActions'
import { createValue, dummyBookResponse, updatedValue } from './testUtil'
import { NUMBER_OF_RUNS } from '../tests/utils'
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

    for (let i = 0; i < NUMBER_OF_RUNS; i++) {
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

      for (let i = 0; i < NUMBER_OF_RUNS; i++) {
        UpdateValueInStore({
          payload: updatedValue,
          store: store,
          state: store.getState(),
          type: ActionTypes.UPDATE
        })
      }
    }
  })

  it('Can handle multiple store manipulations', async () => {
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
    }

    for (let i = 0; i < NUMBER_OF_RUNS; i++) {
      AddANewValueInStore({
        payload: createValue,
        store: store,
        state: store.getState(),
        type: ActionTypes.POST
      })

      UpdateValueInStore({
        payload: updatedValue,
        store: store,
        state: store.getState(),
        type: ActionTypes.UPDATE
      })

      DeleteValueFromStore({
        payload: updatedValue,
        store: store,
        state: store.getState(),
        type: ActionTypes.DELETE
      })
    }
  })
})
