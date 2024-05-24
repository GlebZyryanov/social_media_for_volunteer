const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw ApiError.unauthorized('Token not provided');
        }
  
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            throw ApiError.unauthorized('Invalid token');
        }
  
        const user = await User.findByPk(decoded.user_id);
        if (!user) {
            throw ApiError.unauthorized('Account not found');
        }
  
        if (!user.isActive) {
            throw ApiError.forbidden('Account is inactive');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error); // Передаём ошибку обработчику ошибок express
    }
  };


  const authAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        throw ApiError.forbidden('Access denied (admin only)');
    }
    next();
};
  
  module.exports = { auth, authAdmin };