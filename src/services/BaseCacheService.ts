import { AxiosInstance } from 'axios'
import { StoreState } from '../createStore'
import { BaseCacheResource } from '../resources/BaseCacheResource'
import { ApiQueryParams } from '../types/api'

export class BaseCacheService<T> extends BaseCacheResource<T> {
  private data = null
  private api
  private pathName

  constructor(pathName: string, api: AxiosInstance) {
    super(pathName)

    this.pathName = pathName

    this.api = api
  }

  public async getAllValues(param?: ApiQueryParams, force?: boolean): Promise<StoreState<T[]>> {
    const query = this.pathName
    const data = this.getAll({ query, param })

    if (data && !force) {
      return data
    } else {
      const serverData = await this.api.request<StoreState<T[]>>({
        method: 'GET',
        url: query,
        params: param
      })

      this.set(serverData.data, query, param)

      return serverData.data
    }
  }

  public async getSingleValue(id: string, param?: ApiQueryParams): Promise<StoreState<T>> {
    const query = this.pathName
    const data = this.get({ id, param, query })

    if (data) {
      return data
    } else {
      const serverData = await this.api.request<StoreState<T>>({
        method: 'GET',
        url: query + '/' + id,
        params: param
      })

      return serverData.data
    }
  }

  public async update(id: string, data: T, param?: ApiQueryParams): Promise<StoreState<T>> {
    const query = this.pathName + '/' + id

    const putData = await this.api.request<StoreState<T>>({
      method: 'PUT',
      url: query,
      data: {
        attributes: data
      },
      params: param
    })

    this.put(id, this.pathName, putData.data, param)

    return putData.data
  }

  public async delete(id: string, param?: ApiQueryParams) {
    const query = this.pathName

    await this.api.request({
      method: 'DELETE',
      url: `${query}/${id}`,
      data: param
    })
    this.deleteLocal(id, query, param)
  }

  public async create(data: Partial<T>): Promise<StoreState<T>> {
    const query = this.pathName

    const returnData = await this.api.request<StoreState<T>>({
      method: 'post',
      url: query,
      data: data
    })

    this.post(returnData.data, query)

    return returnData.data
  }
}
