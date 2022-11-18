/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Book } from '../types/books'
import { render, waitFor, act, fireEvent } from '@testing-library/react'
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
      await bookResource.getAll()
    }

    fetchBooks()
  }, [bookResource])

  useEffect(() => {
    bookResource?.getValues(myCustomSelector)
  }, [bookResource])

  const callISBNUpdate = async () => {
    await bookResource.put(2, { _id: '2', isbn: 'updated' })
  }

  const callTitleUpdate = async () => {
    await bookResource.put(1, { _id: '1', title: 'updated' })
  }

  return (
    <>
      <button data-testid="update-isbn" onClick={callISBNUpdate} />
      <button data-testid="update-title" onClick={callTitleUpdate} />
      <ChildComponent selectedValues={mySelectedValues} />
    </>
  )
}

describe('the page relying on selector', () => {
  it('Re-renders only once', async () => {
    global.fetch = jest.fn((url: string) => {
      if (url === 'https://react-state-sync-serverless.vercel.app/api/books') {
        return Promise.resolve({
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
      } else if (url === 'https://react-state-sync-serverless.vercel.app/api/books/1') {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                _id: '1',
                title: 'updated'
              }
            })
        })
      } else {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                _id: '1',
                isbn: 'updated'
              }
            })
        })
      }
    }) as jest.Mock

    const { getByTestId, rerender } = render(<TestComponent />)

    const isbnButton = getByTestId('update-isbn')
    const titleButton = getByTestId('update-title')

    expect(getByTestId('count').textContent).toBe('1')

    await waitFor(() => {
      expect(getByTestId('title').textContent).toBe(' The Great Gatsby ')
    })

    // fireEvent.click(isbnButton)

    fireEvent.click(titleButton)

    expect(getByTestId('count').textContent).toBe('2')

    rerender(<TestComponent />)
    await waitFor(() => {
      expect(getByTestId('title').textContent).toBe(' updated ')
    })
  })
})
