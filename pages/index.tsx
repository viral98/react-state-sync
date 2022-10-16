import { useEffect, useState } from 'react'
import { BookResource } from '../src/resources/BookResource'
import { BookCacheServiceResource } from '../src/services/BookCacheServiceResource'
import { Book } from '../src/types/books'

function App() {
  const [books, setBooks] = useState([] as unknown as Book[])

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await new BookResource(new BookCacheServiceResource()).getAll()

      setBooks(books)
    }

    fetchBooks()
  }, [])

  console.log(books)
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
    </div>
  )
}

export default App
