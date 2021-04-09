import axios from 'axios'
import { store } from './../redux/store'
import { REMOVE_USER } from './../redux/auth/actionTypes'

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
  if (error.response.status === 401) {
    store.dispatch({ type: REMOVE_USER })
  }

  return Promise.reject(error)
}

instance.interceptors.response.use(
  handleResponse,
  handleError
)

export default instance
