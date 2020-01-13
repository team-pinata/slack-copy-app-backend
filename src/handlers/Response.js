export const reject = (error, code = 500) => ({
  error,
  code,
});

export const success = (payload, { headers, code = 200 } = {}) => ({
  payload,
  headers,
  code,
});
