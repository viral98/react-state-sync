import { BaseCacheResource } from '../resources/BaseCacheResource'

export abstract class BaseCacheService<T> {
  private cacheResource

  constructor() {
    this.cacheResource = new BaseCacheResource<T>()
  }

  public async getAll() {
    throw new Error('Not implemented')
  }

  public async get(id: string) {
    throw new Error('Not implemented')
  }

  public async update(id: string, data: Partial<T>) {
    throw new Error('Not implemented')
  }

  public async delete(id: string) {
    throw new Error('Not implemented')
  }

  public async create(data: Partial<T>) {
    throw new Error('Not implemented')
  }
}
