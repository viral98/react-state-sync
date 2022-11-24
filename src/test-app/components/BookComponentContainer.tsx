import React, { useContext, useEffect, useRef, useState } from 'react';
import { Book } from '../../types/books';
import { BookContext } from '../store/BookContext';
import BookComponentContext from './BookComponentContext';

function BookComponentContainer(): JSX.Element {
  const count = useRef(1)

  const [title, setTitle] = useState<string[]>([]);
  const books = useContext(BookContext);

  useEffect(() => {
    count.current += 1
  }, [])

  useEffect(() => {
    if(books && Array.isArray(books)){
      setTitle(books.map((book) => book.title as string));
    }
  }, []);

  return (
    <BookComponentContext selectedValues={title[0]}/>
  )
}

export default BookComponentContainer;
