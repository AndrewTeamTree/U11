const users = async (endpoint, method = 'GET', data = null, credentials = null) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (credentials) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`http://localhost:5000/api/users${endpoint}`, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

export default users;
