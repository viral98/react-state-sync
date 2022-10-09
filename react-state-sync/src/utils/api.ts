import axios from "../../node_modules/axios/index"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export default api