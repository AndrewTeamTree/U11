export const api = (
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
