import React, { useEffect, useState } from 'react'
import { act } from 'react-dom/test-utils'
import { Book } from '../../types/books'
import { BookStoreProvider } from '../store/BookContext'
import { bookReducer } from '../store/bookReducer'
import BookTitle from './BookTitle'

function BookComponentContainer(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetch('https://react-state-sync-serverless.vercel.app/api/books')
      .then((response) => response.json())
      .then((books: Book[]) => {
        act(() => {
          setBooks(books)
        })
      })
  }, [])

  return (
    <BookStoreProvider initialState={books} reducer={bookReducer}>
      <BookTitle />
    </BookStoreProvider>
  )
}

export default BookComponentContainer
