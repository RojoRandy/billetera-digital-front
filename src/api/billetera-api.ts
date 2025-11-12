import axios from 'axios'

const billeteraApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export { billeteraApi }
