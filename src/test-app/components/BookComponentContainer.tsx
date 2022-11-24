import React, { useEffect, useState } from 'react'

import BookContext from './BookContext'

function BookComponentContainer(): JSX.Element {
  const [title, setTitle] = useState<string[]>([])

  const API = 'https://react-state-sync-serverless.vercel.app/api/books'
  const fetchBooks = () => {
    fetch(API).then((res) => res.json())
  }

  useEffect(() => {
    fetchBooks()
    setTitle(['abc', 'bca'])
  }, [])

  return (
    <React.Fragment>
      <BookContext.Provider value={{ Title: title[0] }}>{title}</BookContext.Provider>
    </React.Fragment>
  )
}

export default BookComponentContainer
