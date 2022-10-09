export type FilterOperator = 'eq' | 'in' | 'nin' | 'lt' | 'gt' | 'lteq' | 'gteq' | 'ne'

export interface ApiResponseMeta {
  pages?: number
  records?: number
  [key: string]: unknown
}

export interface ApiResponse<T> {
  normalizedData: T
  meta: ApiResponseMeta
  data: unknown
}

export interface ApiError {
  title: string
  status: number
  detail: string
}

export interface ApiErrorResponse {
  errors: ApiError[]
}
export interface ApiQueryParamsFilter {
  [key: string]:
    | {
        [key in FilterOperator]?: string | number | boolean
      }
    | string
}

export interface ApiQueryParamsPage {
  number: number
  size: number
}

export interface ApiQueryParams {
  page?: ApiQueryParamsPage
  filter?: ApiQueryParamsFilter
  include?: string
  sort?: string
}
