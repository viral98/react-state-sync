import React, { useEffect, useState } from 'react'
import { dummyBookResponse } from '../../hooks/testUtil';
import { Book } from '../../types/books';
import { BookStoreProvider, useBookStore } from '../store/BookContext';
import { AddANewValueInStore, bookReducer } from '../store/bookReducer';
import BookTitle from './BookTitle';

function BookComponentContainer(): JSX.Element {

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('https://react-state-sync-serverless.vercel.app/api/books')
    .then((response) => response.json())
    .then((books: Book[]) => {
      setBooks(books);
    });
  }, []);


  return (
      <BookStoreProvider initialState={books} reducer={bookReducer}>
        <BookTitle />
      </BookStoreProvider>
  )
}

export default BookComponentContainer;
