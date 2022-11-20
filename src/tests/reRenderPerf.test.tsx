/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Book } from '../types/books'
import { render, waitFor, act, fireEvent } from '@testing-library/react'
import React, { useState, useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useOrchestrated } = require('../hooks/useOrchestrated')

interface ChildComponentProps {
  selectedValues: string[]
}

function ChildComponent({ selectedValues }: ChildComponentProps): JSX.Element {
  const count = useRef(1)

  useEffect(() => {
    count.current += 1
  }, [])

  return (
    <React.Fragment>
      <div data-testid="count">{count.current}</div>
      <div data-testid="title"> {selectedValues[0]} </div>
    </React.Fragment>
  )
}

function ParentComponent() {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([])

  const setBooksCallBack = (titles: string[]) => {
    setSelectedBooks(titles)
  }

  return (
    <React.Fragment>
      <TestComponent setBooksCallBack={setBooksCallBack} />
      <ChildComponent selectedValues={selectedBooks} />
    </React.Fragment>
  )
}

interface TestComponentProps {
  setBooksCallBack: (titles: string[]) => void
}

function TestComponent({ setBooksCallBack }: TestComponentProps) {
  // @ts-ignore
  const bookResource = useOrchestrated<Book>({
    pathName: 'https://react-state-sync-serverless.vercel.app/api/books'
  })

  const myCustomSelector = (allBooks: Book[]) => {
    act(() => {
      setBooksCallBack(
        allBooks.map((book) => {
          return book.title as string
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                isbn: 'updated',
                title: 'The Great Gatsby'
              }
            })
        })
      }
    }) as jest.Mock

    const { getByTestId } = render(<ParentComponent />)

    const isbnButton = getByTestId('update-isbn')
    const titleButton = getByTestId('update-title')

    await waitFor(() => {
      expect(getByTestId('count').textContent).toBe('1')
    })

    fireEvent.click(isbnButton)
    await waitFor(() => {
      expect(getByTestId('count').textContent).toBe('1')
    })

    await waitFor(() => {
      expect(getByTestId('title').textContent).toBe(' The Great Gatsby ')
    })

    fireEvent.click(titleButton)

    await waitFor(() => {
      expect(getByTestId('count').textContent).toBe('2')
    })
    await waitFor(() => {
      expect(getByTestId('title').textContent).toBe(' updated ')
    })
  })
})
