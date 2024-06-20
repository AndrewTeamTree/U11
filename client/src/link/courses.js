
  const url = `http://localhost:5000/api/courses`;
const courses = async (endpoint, method = 'GET', data = null, credentials = null) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

 
  // Add authorization header if credentials are provided
  if (credentials) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${url}${endpoint}`, options);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};


export default courses;

/*const url = "http://localhost:5000/api/users";

const users = async (endpoint, method = 'GET', data = null, credentials = null) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  // Add authorization header if credentials are provided
  if (credentials) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${url}${endpoint}`, options);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

export default users;
 */