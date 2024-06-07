

const url = "http://localHost:5000/api/courses";

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

  const response = await fetch(`${url}${endpoint}`, options);
  return response;
};

export default api;
