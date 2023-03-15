import axios from "axios"
import ClientApi from "./ClientApi"

const url = "archive"
const name = "ArchiveService"
export default {
  async fetch() {
    const result = await ClientApi(name, "fetch").get(`${url}`)
    if (!(result && result.data && result.status === 200)) return []
    let archives = result.data
    return archives;
  },

  async get(id) {
    const result = await ClientApi(name, "get").get(`${url}/${id}`)
    if (!(result && result.data && result.status === 200)) return []
    let archive = result.data
    return archive;
  },

  async save(jsonObj) {
    if (!jsonObj) return { error: 'Please provide a JSON with the following format { value: jsonValue }.' }
    let result = await ClientApi(name, 'save').post(`${url}`, jsonObj)
    if (!(result && result.data && result.status === 200)) return { error: 'The object could not be saved. Please try again.' }
    return result.data
  },

  async search(jsonObj) {
    if (!jsonObj) return { error: 'Please provide a JSON with the following format { value: jsonValue }.' }
    const result = await ClientApi(name, "search").post(`${url}/search`, jsonObj)
    if (!(result && result.data && result.status === 200)) return []
    let archives = result.data
    return archives;
  },

  async update(id, jsonObj) {
    if (!jsonObj) return { error: 'Please provide a JSON with the following format { value: jsonValue }.' }
    let result = await ClientApi(name, 'update').patch(`${url}/${id}`, jsonObj)
    if (!(result && result.data && result.status === 200)) return { error: 'The object could not be saved. Please try again.' }
    return result.data
  },
  async export(jsonObj) {
    const result = await ClientApi(name, "export").post(`${url}/export`, jsonObj)
    if (!(result && result.data && result.status === 200)) return []
    let archive = result.data
    return archive;
  }
}
