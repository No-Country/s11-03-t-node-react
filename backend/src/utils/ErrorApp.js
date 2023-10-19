const ErrorApp = (message, statusCode) => {
  return {
    message: message,
    statusCode: statusCode,
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
  };
};

export default ErrorApp;
