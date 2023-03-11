import ClientApi from "./ClientApi"

const url = "checkpoint"
const name = "CheckpointService"
export default {
  async fetch() {
    const result = await ClientApi(name, "fetch").get(`${url}`)
    if (result.status !== 200) return { error: "There was an error processing your request" }
    if (!(result && result.data && result.data.result.length)) return []
    let checkpoints = result.data.result
    return checkpoints;
  },

  async get(id) {
    const result = await ClientApi(name, "get").get(`${url}/${id}`)
    if (!(result && result.data && result.status !== 200)) return []
    let checkpoints = result.data
    return checkpoints;
  },

  async save(jsonObj) {
    if (!jsonObj) return { error: 'Please provide a JSON with the following format { value: jsonValue }.' }
    let result = await ClientApi(name, 'save').post(`${url}`, jsonObj)
    if (!(result && result.data && result.status === 200)) return { error: 'The object could not be saved. Please try again.' }
    return result.data.result
  }
}
