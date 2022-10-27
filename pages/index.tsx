import { useEffect, useState } from 'react'
import { useOrchestrated } from '../src/hooks/useOrchestrated'
import { Book } from '../src/types/books'
import { Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

function App() {
  const [books, setBooks] = useState([] as unknown as Book[])
  const [mySelectedValues, setMySelectedValues] = useState([] as { title: string; id: string }[])
  const bookResource = useOrchestrated<Book>({ pathName: 'books' })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'isbn', headerName: 'ISBN', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 160
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 160
    },
    {
      field: 'published_date',
      headerName: 'Published Date',
      width: 160
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      width: 160
    }
  ]

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
    setMySelectedValues(
      allBooks.map((book) => {
        return { title: book.title, id: book._id }
      })
    )
  }

  bookResource?.getValues(myCustomSelector)
  return (
    <Grid container height={'100vh'} width={'100vw'} rowGap={15}>
      <Grid item xs={12}>
        <Typography variant={'h3'}>Books</Typography>
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant={'h3'}>Iterating over Selectors</Typography>
        <DataGrid
          rows={mySelectedValues}
          columns={columns.filter((column) => column.field === 'title')}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Grid>
    </Grid>
  )
}

export default App
