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

  public async getAllValues(param?: ApiQueryParams): Promise<StoreState<T[]>> {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName
    const data = this.getAll({ query, param })

    if (data) {
      console.log('Turn around, local data is fresh', data)
      return data
    } else {
      const serverData = await (
        await this.api(process.env.NEXT_PUBLIC_API_URL + this.pathName, param ?? {})
      ).json()

      this.set(serverData, query, param)

      console.log('Hitting the backend server', serverData)
      return serverData
    }
  }

  public async getSingleValue(id: string, param?: ApiQueryParams): Promise<T> {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName

    const data = this.get({ id, param, query })

    if (data) {
      return data
    } else {
      const serverData = await (
        await this.api(process.env.NEXT_PUBLIC_API_URL + this.pathName + '/' + id, param ?? {})
      ).json()

      return serverData
    }
  }

  public async update(id: string, data: T, param?: ApiQueryParams) {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data)
    }
    const putData = await (await this.api(query, requestOptions)).json()

    this.put(id, query, putData, param)
  }

  public async delete(id: string, param?: ApiQueryParams) {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName

    fetch(query + '/' + id, { method: 'DELETE' })
    this.deleteLocal(id, query, param)
  }

  public async create(data: Partial<T>): Promise<T> {
    const query = process.env.NEXT_PUBLIC_API_URL + this.pathName

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }

    const returnData = await (await this.api(query, requestOptions)).json()

    this.post(returnData.data, query)

    return returnData.data
  }
}
