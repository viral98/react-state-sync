/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Book } from '../types/books'
import { render, waitFor, act } from '@testing-library/react'
import React, { useState, useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useOrchestrated } = require('../hooks/useOrchestrated')

interface TestComponentProps {
  selectedValues: { title: string }[]
}

function ChildComponent({ selectedValues }: TestComponentProps): JSX.Element {
  const count = useRef(1)

  useEffect(() => {
    count.current += 1
  }, [])

  return (
    <React.Fragment>
      <div data-testid="count">{count.current}</div>
      <div data-testid="title"> {selectedValues[0]?.title} </div>
    </React.Fragment>
  )
}

function TestComponent() {
  const [mySelectedValues, setMySelectedValues] = useState([] as { title: string }[])

  // @ts-ignore
  const bookResource = useOrchestrated<Book>({
    pathName: 'https://react-state-sync-serverless.vercel.app/api/books'
  })

  const myCustomSelector = (allBooks: Book[]) => {
    act(() => {
      setMySelectedValues(
        allBooks.map((book) => {
          return { title: book.title as string }
        })
      )
    })
  }

  useEffect(() => {
    async function fetchBooks() {
      await act(async () => {
        await bookResource.getAll()
      })
    }

    fetchBooks()
  }, [bookResource])

  useEffect(() => {
    bookResource?.getValues(myCustomSelector)
  }, [bookResource])

  // const callISBNUpdate = () => {
  //   bookResource.update({ _id: '1', isbn: 'updated' })
  // }

  // const callTitleUpdate = () => {
  //   bookResource.update({ _id: '1', title: 'updated' })
  // }

  return (
    <>
      <ChildComponent selectedValues={mySelectedValues} />
    </>
  )
}

describe('the page relying on selector', () => {
  it('Re-renders only once', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                _id: '1',
                title: 'The Great Gatsby'
              }
            ]
          })
      })
    ) as jest.Mock

    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId('count').textContent).toBe('1')

    await waitFor(() => {
      expect(getByTestId('title').textContent).toBe(' The Great Gatsby ')
    })
  })
})
