import createStore, { DefaultObject } from '../createStore'
import { BaseCacheResource } from '../resources/BaseCacheResource'
import { BaseResource } from '../resources/BaseResource'
import { BaseCacheService } from '../services/BaseCacheService'
import api from '../utils/api'

interface UseOrchestratedProps<T> {
  pathName: string
}
export function useOrchestrated<T extends DefaultObject>({ pathName }: UseOrchestratedProps<T>) {
  const concreteApi = api({})
  const concreteCacheService = new BaseCacheService<T>(pathName, concreteApi)
  const concreteBaseResource = new BaseResource<T>(concreteCacheService, pathName)

  return concreteBaseResource
}
