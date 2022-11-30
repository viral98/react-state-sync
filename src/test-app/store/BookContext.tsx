import React, { createContext, ReactNode, useReducer } from 'react'
import { StoreState } from '../../createStore'
import { Book } from '../../types/books'
import { BaseActions } from './bookReducer'

export const BookStore = createContext<StoreState<Book>[]>([] as StoreState<Book>[])
export const BookStoreDispatch = createContext<React.Dispatch<BaseActions<Book>> | undefined>(
  undefined
)

interface Props {
  children?: ReactNode
  initialState: Book[]
  reducer: (state: StoreState<Book>[], action: BaseActions<Book>) => StoreState<Book>[]
}

export const BookStoreProvider = ({ children, initialState, reducer }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <BookStore.Provider value={state}>
      <BookStoreDispatch.Provider value={dispatch}>{children}</BookStoreDispatch.Provider>
    </BookStore.Provider>
  )
}
