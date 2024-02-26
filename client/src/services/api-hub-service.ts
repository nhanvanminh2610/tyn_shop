import http from "../common/http"

const ROOT_URL = `/`

const apiHubService = {
  get: async (endpoint, params) => {
    const fullEndpoint = ROOT_URL + endpoint
    const urlParams = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((val) => urlParams.append(key, val))
      } else if (value) {
        urlParams.append(key, String(value))
      }
    }

    const response = await http.get(fullEndpoint, { params: urlParams })

    return response.data.data
  },
  getlist: async (endpoint, params) => {
    const fullEndpoint = ROOT_URL + endpoint
    const response = await http.get(fullEndpoint, { params })

    return response.data.data
  },
  getDetail: async (endpoint, id) => {
    const fullEndpoint = ROOT_URL + endpoint + `/${id}`
    const response = await http.get(fullEndpoint)

    return response.data.data
  },
  create: async (endpoint, data) => {
    const response = await http.post(ROOT_URL + endpoint, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  },
  import: async (endpoint, data) => {
    const response = await http.post(ROOT_URL + endpoint, data, {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    })

    return response.data
  },
  update: async (endpoint, data) => {
    const response = await http.put(ROOT_URL + endpoint, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  },
  delete: async (endpoint, id) => {
    const fullEndpoint = ROOT_URL + endpoint + `/${id}`
    const response = await http.delete(fullEndpoint)

    return response.data
  }
}

export default apiHubService
