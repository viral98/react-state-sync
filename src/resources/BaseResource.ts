import createStore from '../createStore'
import { ApiQueryParams } from '../types/api'

export abstract class BaseResource<T> {
  constructor() {
    const store = createStore({} as T)

    console.log(store)
  }
  public getAll = async (params?: ApiQueryParams) => {
    console.error(params)

    throw new Error('Not implemented')
  }

  public post = async (data: Partial<T>) => {
    console.error(data)

    throw new Error('Not implemented')
  }

  public get = async (id: string) => {
    console.error(id)

    throw new Error('Not implemented')
  }

  public put = async (id: string, data: Partial<T>) => {
    console.error(id, data)

    throw new Error('Not implemented')
  }

  public delete = async (id: string) => {
    console.error(id)

    throw new Error('Not implemented')
  }
}
