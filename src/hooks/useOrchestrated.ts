import { useMemo } from 'react'
import { DefaultObject } from '../createStore'
import { BaseResource } from '../resources/BaseResource'
import { BaseCacheService } from '../services/BaseCacheService'
import api from '../utils/api'

interface UseOrchestrated {
  pathName: string
}

export function useOrchestrated<T extends DefaultObject>({ pathName }: UseOrchestrated) {
  const concreteBaseResource = useMemo(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }

    const concreteCacheService = new BaseCacheService<T>(pathName, api)
    const concreteBaseResource = new BaseResource<T>(concreteCacheService, pathName)

    return concreteBaseResource
  }, [pathName])

  return concreteBaseResource
}

module.exports = { useOrchestrated }
