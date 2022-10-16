import { useEffect, useState } from 'react'
import { useOrchestrated } from '../src/hooks/useOrchestrated'
import { Book } from '../src/types/books'

function App() {
  const [books, setBooks] = useState([] as unknown as Book[])
  const [mySelectedValues, setMySelectedValues] = useState([] as unknown as Book[keyof Book][])
  const bookResource = useOrchestrated<Book>({ pathName: 'books' })

  useEffect(() => {
    const fetchBooks = async () => {
      if (bookResource) {
        const books = await bookResource.getAll()

        setBooks(books)
      }
    }

    fetchBooks()
  }, [bookResource])

  const myCustomSelector = (allBooks: Book[]) => {
    setMySelectedValues(allBooks.map((book) => book.title))
  }

  bookResource?.getValues(myCustomSelector)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: 600,
        gap: '2rem'
      }}>
      <div>
        <h2>Books</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        A List of Selected values over Title
        {mySelectedValues.map((value: Book[keyof Book], index) => (
          <span key={index}>{value}</span>
        ))}
      </div>
    </div>
  )
}

export default App
