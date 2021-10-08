const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (rq, rp, next) => {
  const bearerToken = rq.headers.authorization;
  if (bearerToken) {
    try {
      const token = bearerToken.split('Bearer ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_WORD);
      rq.user = decoded;
      return next();
    } catch (error) {
      next(error)
    }  
  }
  rp.json({
    message: 'you must login'
  })
}

module.exports = {validateToken}