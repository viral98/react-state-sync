import { ApiQueryParams } from '../types/api'

interface CacheStringInterface {
  url?: string
  param?: ApiQueryParams
  query?: string
}
export function generateCacheString({ url, param, query }: CacheStringInterface) {
  // Copied from: https://github.com/TanStack/query/blob/main/packages/query-core/src/utils.ts
  const queryString = JSON.stringify(param, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key]
            return result
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }, {} as any)
      : val
  )

  return url + queryString + query
}

// Copied from: https://github.com/jonschlinkert/is-plain-object
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export function isPlainObject(o: any): o is Object {
  if (!hasObjectPrototype(o)) {
    return false
  }

  // If has modified constructor
  const ctor = o.constructor

  if (typeof ctor === 'undefined') {
    return true
  }

  // If has modified prototype
  const prot = ctor.prototype

  if (!hasObjectPrototype(prot)) {
    return false
  }

  // eslint-disable-next-line no-prototype-builtins
  if (!prot.hasOwnProperty('isPrototypeOf')) {
    return false
  }

  // Most likely a plain Object
  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasObjectPrototype(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]'
}
