import createStore from './createStore'
import { Book } from './types/books'

const store = createStore<Book>([])

export type ValuesStore = ReturnType<typeof store.getState>

export default store
