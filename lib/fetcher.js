export default async function apiFetcher(endpoint, options = {}) {
  const { headers = new Headers() } = options

  if (localStorage.getItem('authToken')) {
    const token = localStorage.getItem('authToken')
    headers.set('Authorization', `Token ${token}`)
  }

  try {
    const response = await fetch(endpoint, { ...options, headers })

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json()

    if (response.ok) {
      return data
    }

    const error = new Error(response.statusText)
    error.response = response
    error.data = data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}
