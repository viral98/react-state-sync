import React, { useEffect, useRef } from 'react'
import { useBookStore } from '../store/BookContext'

function BookTitle(): JSX.Element {
  const [state] = useBookStore()
  const count = useRef(1)

  useEffect(() => {
    count.current += 1
  }, [])

  return (
    <React.Fragment>
      <div data-testid="count">{count.current}</div>
      <div data-testid="title"> {state[0].title} </div>
    </React.Fragment>
  )
}

export default BookTitle
