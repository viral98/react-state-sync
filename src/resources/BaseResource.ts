import createStore from '../createStore'

export abstract class BaseResource<T> {
  private store

  constructor() {
    this.store = createStore([] as T[])
  }

  protected abstract getPath(): string

  protected abstract getName(): string

  public getAll = async () => {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + this.getPath())

    this.store.setState((await resp.json()) as unknown as T[])

    return this.store.getState()
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
