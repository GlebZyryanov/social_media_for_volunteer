const ApiError = require('../error/ApiError') 

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError)
    return res.status(err.code).json({ code: err.code, error: err.message })

  return res.status(500).json({ code: err.code, error: 'Something went wrong' })
}

module.exports = errorHandler