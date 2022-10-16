import { useEffect, useState } from 'react'
import { BookResource } from '../src/resources/BookResource'
import { BookCacheServiceResource } from '../src/services/BookCacheServiceResource'
import { Book } from '../src/types/books'

function App() {
  const [books, setBooks] = useState([] as unknown as Book[])
  const bookResource = new BookResource(new BookCacheServiceResource())
  const [mySelectedValues, setMySelectedValues] = useState([] as unknown as Book[keyof Book][])

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await bookResource.getAll()

      setBooks(books)
    }

    fetchBooks()
  }, [])

  const myCustomSelector = (allBooks: Book[]) => {
    setMySelectedValues(allBooks.map((book) => book.title))
  }

  console.log('Testing if we get a value', bookResource.getValues(myCustomSelector))

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
            {books.map((book: Book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mySelectedValues.map((value: Book[keyof Book]) => value)}
    </div>
  )
}

export default App
