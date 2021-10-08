const AuthServices = require('../services/auth.services');

const login = async (rq, rp, next) => {
  try {
    const {email, password} = rq.body;
    const result = await AuthServices.login(email, password);
    if (result.valid) {
      const user = {
        id: result.id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email
      };
      const token = AuthServices.getToken(user);
      return rp.json({
        message: 'successful login',
        token: token
      });
    }
    return rp.json({message: 'invalid credentials'});
  } catch (error) {
    next(error)
  }
};

module.exports = login;