const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const ApiError = require("../error/ApiError");

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
  
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw ApiError.unauthorized('Account not found');
        }
        console.log('User found:', user); // Логирование найденного пользователя

        req.user = decoded;
        console.log('req.user set:', req.user); // Логирование установленного req.user
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error); // Логирование ошибки
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