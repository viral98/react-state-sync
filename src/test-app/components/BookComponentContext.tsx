import React, { useEffect, useRef } from 'react';

interface TestComponentProps {
  selectedValues: Partial<string>
}

function BookComponentContext({ selectedValues }: TestComponentProps): JSX.Element {
  const count = useRef(1)

  useEffect(() => {
    count.current += 1
  }, [])

  return (
    <React.Fragment>
      <div data-testid="count">{count.current}</div>
      <div data-testid="title"> {selectedValues} </div>
    </React.Fragment>
  )
}

export default BookComponentContext;
