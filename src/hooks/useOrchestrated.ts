import { useMemo } from 'react'
import { DefaultObject } from '../createStore'
import { BaseResource } from '../resources/BaseResource'
import { BaseCacheService } from '../services/BaseCacheService'
import api from '../utils/api'

interface UseOrchestratedProps {
  pathName: string
}
export function useOrchestrated<T extends DefaultObject>({ pathName }: UseOrchestratedProps) {
  const concreteBaseResource = useMemo(() => {
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
