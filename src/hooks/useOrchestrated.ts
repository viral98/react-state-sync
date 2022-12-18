import axios, { RawAxiosRequestHeaders } from 'axios'
import { useMemo } from 'react'
import { DefaultObject } from '../createStore'
import { BaseResource } from '../resources/BaseResource'
import { BaseCacheService } from '../services/BaseCacheService'
import Qs from 'qs'

interface UseOrchestrated {
  pathName: string
  headers?: RawAxiosRequestHeaders
}

export function useOrchestrated<T extends DefaultObject>({ pathName, headers }: UseOrchestrated) {
  const concreteBaseResource = useMemo(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }

    const api = axios.create()

    api.defaults.withCredentials = Boolean(headers)

    api.interceptors.request.use((config) => {
      config.paramsSerializer = (params: any) => {
        return Qs.stringify(params, {
          arrayFormat: 'brackets',
          encode: false
        })
      }

      config.headers = headers

      return config
    })

    const concreteCacheService = new BaseCacheService<T>(pathName, api)
    const concreteBaseResource = new BaseResource<T>(concreteCacheService, pathName)

    return concreteBaseResource
  }, [headers, pathName])

  return concreteBaseResource
}

module.exports = { useOrchestrated }
