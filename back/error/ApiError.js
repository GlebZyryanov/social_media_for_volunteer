class ApiError {
    constructor(code, message) {
      this.code = code
      this.message = message
    }
  
    static badRequest(message) {
      return new ApiError(400, message)
    }
  
    static unauthorized(message) {
      return new ApiError(401, message)
    }
  
    static forbidden(message) {
      return new ApiError(403, message)
    }
  
    static notFound(message) {
      return new ApiError(404, message)
    }
  
    static methodNotAllowed(message) {
      return new ApiError(405, message)
    }
  
    static internal(message) {
      return new ApiError(500, message)
    }
    static conflict(message) {
      return new ApiError(409, message);
  }
  }
  
  module.exports = ApiError
  