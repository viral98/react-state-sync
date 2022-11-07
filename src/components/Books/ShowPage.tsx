import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useOrchestrated } from '../../hooks/useOrchestrated'
import { Book } from '../../types/books'
import ImgMediaCard from '../common/ImgMediaCard'
import styles from './ShowPage.module.scss'

export const BookListView = (): JSX.Element => {
  const [books, setBooks] = useState([] as unknown as Book[])
  const bookResource = useOrchestrated<Book>({ pathName: 'books' })
  const router = useRouter()

  useEffect(() => {
    const fetchBooks = async () => {
      if (bookResource) {
        const books = await bookResource.getAll()

        setBooks(books)
      }
    }

    fetchBooks()
  }, [bookResource])

  const learnMoreFunction = (id: string) => {
    router.push(`/books/${id}`)
  }

  return (
    <Grid container rowGap={15} className={styles.showPage}>
      <Grid container item xs={12} className={styles.showPage__cardsContainer} rowGap={5}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <ImgMediaCard
              title={book.title}
              description={book.description}
              key={book._id}
              id={book._id}
              learnMoreFunction={learnMoreFunction}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default BookListView
