const {users} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthServices {
  static async login(email, password) {
    try {
      let result = await users.findOne({where: {email}});
      const valid = bcrypt.compareSync(password, result.password);
      result = JSON.parse(JSON.stringify(result));
      if (valid) {
        return {
          valid: true,
          ...result
        };
      };
      return {
        valid: false
      };
    } catch (error) {
      return {valid: false};
    }
  }
  static getToken(user) {
    try {
      const token = jwt.sign(user, process.env.SECRET_WORD, {
        expiresIn: '2h',
        algorithm: 'HS256'
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = AuthServices;