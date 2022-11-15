import { useMemo } from 'react'
import { DefaultObject } from '../createStore'
import { BaseResource } from '../resources/BaseResource'
import { BaseCacheService } from '../services/BaseCacheService'
import api from '../utils/api'

export function useOrchestrated<T extends DefaultObject>({ pathName }: { pathName: string }) {
  const concreteBaseResource = useMemo(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }

    const concreteApi = api({})

    if (!concreteApi) {
      return null
    }

    const concreteCacheService = new BaseCacheService<T>(pathName, concreteApi)
    const concreteBaseResource = new BaseResource<T>(concreteCacheService, pathName)

    return concreteBaseResource
  }, [pathName])

  return concreteBaseResource
}

module.exports = { useOrchestrated }
