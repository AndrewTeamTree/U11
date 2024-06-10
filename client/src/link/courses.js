
const url = "http://localhost:5000/api/courses";  

const courses = async (path, method = 'GET', body = null, credentials = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  if (credentials) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  const response = await fetch(`${url}${path}`, options);
  return response;
};

export default courses;
