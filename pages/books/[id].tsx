import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ImgMediaCard from '../../src/components/common/ImgMediaCard'
import { useOrchestrated } from '../../src/hooks/useOrchestrated'
import { Book } from '../../src/types/books'

export function BookShowPage() {
  const [book, setBook] = useState<Book>()
  const router = useRouter()
  const { id } = router.query
  const bookResource = useOrchestrated<Book>({ pathName: 'books' })

  useEffect(() => {
    const fetchBook = async () => {
      if (bookResource && id) {
        const fetchedBook = await bookResource.get(id as string)

        setBook(fetchedBook)
      }
    }

    if (id) {
      fetchBook()
    }
  }, [bookResource, id])

  if (!book) {
    return <div>Loading...</div>
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <ImgMediaCard title={book.title} description={book?.description} id={book._id} />
      </Grid>
    </Grid>
  )
}

export default BookShowPage
