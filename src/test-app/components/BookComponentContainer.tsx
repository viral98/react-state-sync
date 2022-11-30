import React from 'react'

import { BookStoreProvider } from '../store/BookContext'
import { bookReducer } from '../store/bookReducer'
import BookParent from './BookParent'
import BookTitle from './BookTitle'

function BookComponentContainer(): JSX.Element {
  return (
    <BookStoreProvider initialState={[]} reducer={bookReducer}>
      <BookParent />
      <BookTitle />
    </BookStoreProvider>
  )
}

export default BookComponentContainer
