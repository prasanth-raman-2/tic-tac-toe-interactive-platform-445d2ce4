export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data && error.response.data.detail) {
      return Array.isArray(error.response.data.detail)
        ? error.response.data.detail[0].msg
        : error.response.data.detail;
    }
    return `Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server. Please check your connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'An unexpected error occurred';
  }
};
