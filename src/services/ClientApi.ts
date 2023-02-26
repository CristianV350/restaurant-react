import axios from 'axios'
import { shared } from './shared'

const baseUrlFromParts = (port, subpath) => {
  if (port) port = `:${port}`
  if (!subpath.startsWith('/')) subpath = `/${subpath}`
  /** Structure: ${scheme}://${host}:${port}/${subpath} */
  return `${shared.env.VUE_APP_API_SCHEME}://${shared.env.VUE_APP_API_HOST}${port || ''}${subpath || ''}`
}

const apiBaseUrl = () => baseUrlFromParts(shared.env.VUE_APP_API_PORT, shared.env.VUE_APP_API_SUBPATH)


export default (clientName, opName) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Accept'] = 'application/json'
  axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.headers.get['Accept'] = '*/*'
  let instance = axios.create({ baseURL: apiBaseUrl() })
  instance.interceptors.response.use((response) => {
    return response
  }, function (error) {
    console.error('Client API error: ', error, clientName, opName)
    /** In case of network errors, `response` won't be set on the error */
    if (!error.response || !error.response.status) return Promise.reject(error)
    return Promise.reject(error)
  })
  return instance
}
