const BASE_URL = 'http://localhost:5000';

export const api = async (endpoint, method = 'GET', body = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
