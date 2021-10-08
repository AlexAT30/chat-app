const PasswordServices = require('../services/password.services');


const passRecover = async (rq, rp, next) => {
  try {
    const {email} = rq.body;
    const response = await PasswordServices.recover(email);
    rp.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  passRecover
}