import { Dispatch, useEffect, useReducer } from 'react'
import { act } from 'react-dom/test-utils'
import { ActionTypes } from '../../actions/BaseActions'
import { DefaultObject } from '../../createStore'
import { Book } from '../../types/books'
import { BaseActions, bookReducer } from '../store/bookReducer'

export const useBooks = (): {
  data: Book[] | null
  bookDispatch: Dispatch<BaseActions<DefaultObject>>
} => {
  const [bookState, bookDispatch] = useReducer(bookReducer, [])

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('https://react-state-sync-serverless.vercel.app/api/books')
      const data = (await response.json()).data

      act(() => {
        bookDispatch({
          type: ActionTypes.GET_ALL,
          payload: data
        })
      })
    }

    fetchBooks()
  }, [])

  return {
    data: bookState,
    bookDispatch
  }
}
