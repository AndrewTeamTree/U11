
const api = async (endpoint, method = ('POST', 'GET', 'DELETE'), data = null, credentials = null) => {
  const url = "http://localhost:5000/api" // Adjust URL as per your backend configuration
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  // Add authorization header if credentials are provided
  if (credentials) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)
    options.headers['Authorization'] = `Basic ${encodedCredentials}`
  }

  if (data) {
    options.body = JSON.stringify(data)
  }



  try {
    const response = await fetch(`${url}${endpoint}`, options)
    if (!response.ok) {
      const errorMessage = await response.text()
      console.error('API Response Error:', errorMessage) // Debugging line
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`)
    }

    return response
  } catch (error) {
    console.error('Fetch error:', error.message)
    throw error
  }
}

export default api
