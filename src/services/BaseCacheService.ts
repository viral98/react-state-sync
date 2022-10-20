import { StoreState } from '../createStore'
import { BaseCacheResource } from '../resources/BaseCacheResource'
import { ApiQueryParams } from '../types/api'

export class BaseCacheService<T> extends BaseCacheResource<T> {
  private data = null
  private api
  private pathName

  constructor(pathName: string, api: (input: RequestInfo, init: RequestInit) => Promise<Response>) {
    super(pathName)

    this.pathName = pathName

    this.api = api
  }

  public async getAllValues(params?: ApiQueryParams): Promise<StoreState<T[]>> {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName
    const data = this.get({ param: params, query })

    if (data) {
      console.log('Turn around, local data is fresh', data)
      return data
    } else {
      const serverData = await (
        await this.api(process.env.NEXT_PUBLIC_API_URL + this.pathName, params ?? {})
      ).json()

      this.set(serverData, query, params)

      console.log('Hitting the backend server', serverData)
      return serverData
    }
  }

  public async getSingleValue(param: ApiQueryParams, id: string, query: string): Promise<T | void> {
    const data = this.get({ id, param, query })

    if (data) {
      //TODO: FIX THIS
      return data as unknown as T
    } else {
      const serverData = await (
        await this.api(process.env.NEXT_PUBLIC_API_URL + this.pathName, param ?? {})
      ).json()

      this.set(serverData, query, param)
      return serverData
    }
  }

  public async update(id: string, data: T, param: ApiQueryParams) {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName

    console.log(id)
    this.put(query, data, param)
  }

  public async delete(id: string) {
    console.error(id)

    throw new Error('Not implemented')
  }

  public async create(data: Partial<T>) {
    //const dataToCreate = await fetch(process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_PATH)
    console.log(data)
    throw new Error('Not implemented')
  }
}
