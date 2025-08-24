const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  return res.status(500).json({ 
    msg: err.message,
    additional:"Somthing went wrong!" 
  });
}

// module.exports = errorHandlerMiddleware
export default errorHandlerMiddleware;
