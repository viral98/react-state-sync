import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getRandomMediaImage } from '../../src/components/common/ImgMediaCard'
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
    <Grid container padding={10}>
      <Grid item xs={12}>
        <Typography variant="h1">{book.title}</Typography>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={6}>
          <img alt={book.title} height="350" src={getRandomMediaImage()} />
        </Grid>
        <Grid container item xs={12} sm={6} rowGap={0}>
          <Grid item xs={12}>
            <Typography variant="h5">Description</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{book.description}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">Author</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body1">{book.author}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BookShowPage
