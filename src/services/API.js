const API_URL = 'http://api.cocozap-admin.com.br/api'

export const API = {
  getNotifications: () => {
    return get(`/notifications`)
  },
}

const get = url => {
  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return error
    })
}
