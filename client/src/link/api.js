const api = async (endpoint, method, data) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`http://localhost:5000/api/courses${endpoint}`, options);
  return response;
};

export default api;
