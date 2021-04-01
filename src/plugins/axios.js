import axios from 'axios'
import { store } from './../redux/store'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  responseType: 'json'
})

instance.interceptors.request.use(config => {
  const { access_token } = store
    .getState()
    .auth

  config.headers.Authorization = `Bearer ${access_token}`

  return config
})

const handleResponse = response => {
  return response.data
}

const handleError = error => {
  return Promise.reject(error)
}

instance.interceptors.response.use(
  handleResponse,
  handleError
)

export default instance
