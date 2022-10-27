import { useEffect, useState } from 'react'
import { useOrchestrated } from '../src/hooks/useOrchestrated'
import { Book } from '../src/types/books'
import { Grid, Typography, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../src/components/FormInput'

function App() {
  const [books, setBooks] = useState([] as unknown as Book[])
  const [mySelectedValues, setMySelectedValues] = useState([] as { title: string; _id: string }[])
  const bookResource = useOrchestrated<Book>({ pathName: 'books' })

  const methods = useForm<Book>()

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70 },
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
        return { title: book.title, _id: book._id }
      })
    )
  }

  bookResource?.getValues(myCustomSelector)

  const handleSubmit = (newBook: Book) => {
    bookResource?.post(newBook)
  }

  return (
    <Grid container height={'100%'} width={'100%'} rowGap={15}>
      <Grid item xs={12} height={'20rem'}>
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

      <Grid item xs={12} height={'20rem'}>
        <Typography variant={'h3'}>Iterating over Selectors</Typography>
        <DataGrid
          rows={mySelectedValues}
          columns={columns.filter((column) => column.field === 'title')}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant={'h3'}>Create a book</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormInput name={'title'} label={'Title'} required />
            <FormInput name={'isbn'} label={'ISBN'} required />
            <FormInput name={'author'} label={'Author'} required />
            <FormInput name={'description'} label={'Description'} required />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  )
}

export default App
