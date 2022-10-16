import { ApiQueryParams } from '../types/api'

interface CacheStringInterface {
  url?: string
  param?: ApiQueryParams
  query?: string
}
export function generateCacheString({ url, param, query }: CacheStringInterface) {
  return [url, query, param].toString()
}
