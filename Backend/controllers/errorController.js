const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  // operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  // programming or other unknown error: don't leak error details
  } else {
    // log the error in 
    console.error('error', err)

    // send the a generic message to the client
    res.status(500).json({
      status: 'error',
      message: 'Something went worng! please contact the developer'
    });
  }
}

module.exports = (err, req, res, next) => {
  // by giving 4 parameters express autometically knows it is an error handling middlewire
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    sendErrorProd(error, res);
  }
}