
const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const api = async (endpoint, method, data) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, options);
  return response;
};

export default api;
















/*export const api = (
  path,
  method = "GET",
  body = null,
  credentials = null
) => {
  const url = 'http://localHost:5000/api' + path;
  const options = {
    method,
    headers: {}
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  };

  if (credentials) {
    const encodedCreds = btoa(
      `${credentials.username}:${credentials.password}`
    );
    options.headers.Authorization = `Basic ${encodedCreds}`;
  }

  return fetch(url, options);
};

export default api;
*/