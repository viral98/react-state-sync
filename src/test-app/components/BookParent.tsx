import React, { useContext, useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import { ActionTypes } from '../../actions/BaseActions'
import { BookStoreDispatch } from '../store/BookContext'

export default function BookParent(): JSX.Element {
  const dispatch = useContext(BookStoreDispatch)

  useEffect(() => {
    async function fetchBooks() {
      const resp = await fetch('https://react-state-sync-serverless.vercel.app/api/books')
      const books = (await resp.json()).data

      act(() => {
        if (dispatch) dispatch({ type: ActionTypes.GET_ALL, payload: books })
      })
    }

    fetchBooks()
  }, [dispatch])

  const callISBNUpdate = async () => {
    const data = await fetch('https://react-state-sync-serverless.vercel.app/api/books/2')

    const book = (await data.json()).data

    if (dispatch) dispatch({ type: ActionTypes.UPDATE, payload: book })
  }

  const callTitleUpdate = async () => {
    const data = await fetch('https://react-state-sync-serverless.vercel.app/api/books/1')

    const book = (await data.json()).data

    act(() => {
      if (dispatch) dispatch({ type: ActionTypes.UPDATE, payload: book })
    })
  }

  return (
    <>
      <button data-testid="update-isbn" onClick={callISBNUpdate} />
      <button data-testid="update-title" onClick={callTitleUpdate} />
    </>
  )
}
