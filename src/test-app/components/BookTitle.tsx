import React, { useEffect, useRef } from 'react'
import { useBooks } from '../hooks/useBooks'

function BookTitle(): JSX.Element {
  const { data } = useBooks()
  const count = useRef(1)

  useEffect(() => {
    count.current += 1
  }, [])

  return (
    <React.Fragment>
      <div data-testid="count">{count.current}</div>
      <div data-testid="title"> {data && data.length > 0 ? data[0].title : 'Loading'} </div>
    </React.Fragment>
  )
}

export default BookTitle
