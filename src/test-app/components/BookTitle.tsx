import React, { useContext, useEffect, useRef } from 'react'
import { BookStore } from '../store/BookContext'

function BookTitle(): JSX.Element {
  const count = useRef(1)
  const contextValues = useContext(BookStore)

  useEffect(() => {
    count.current += 1
  }, [])

  return (
    <React.Fragment>
      <div data-testid="count">{count.current}</div>
      <div data-testid="title">{contextValues[0].title}</div>
    </React.Fragment>
  )
}

export default BookTitle
