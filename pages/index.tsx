import { useEffect } from 'react'
import store, { type ValuesStore } from '../src/store'
import { Book } from '../src/types/books'

const DisplayValue = () => {
  const val = store.useStore((state) => state)

  return (
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
          {val?.books.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function App({ initialState }: { initialState: ValuesStore }) {
  store.serverInitialize(initialState)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      const books = await fetch(process.env.NEXT_PUBLIC_API_URL + 'books')

      store.setState({ books: (await books.json()) as unknown as Book[] })
    })()
  }, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: 600,
        gap: '2rem'
      }}>
      <DisplayValue />
    </div>
  )
}

export default App
