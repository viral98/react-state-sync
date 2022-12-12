import axios from 'axios'
import Qs from 'qs'

const api = axios.create()

api.defaults.withCredentials = false

api.interceptors.request.use((config) => {
  config.paramsSerializer = (params: any) => {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false
    })
  }

  return config
})

export default api
