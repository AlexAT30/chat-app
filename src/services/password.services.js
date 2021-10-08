const {users} = require('../models');
const sendEmail = require('../utils/sendEmail');
const sequializeObj = require('../utils/sequalizeObj');
const path = require('path');
const ejs = require('ejs');

const emailTemplatePath = path.resolve('src', 'views/email-templates', 'welcome.ejs');

class PasswordServices {
  static async recover (email) {
    const sequalizeUser = await users.findOne({where: {email}});
    const user = sequializeObj(sequalizeUser);
    const template = await ejs.renderFile(emailTemplatePath, {title: `Hola ${user.firstname} ${user.lastname}`});
    const emailOptions = {
      subject: 'Restablecer contraseña',
      to: user.email,
      from: 'WhatsUp <marioalejandro300402@gmail.com>',
      html: template
    };
    const response = await sendEmail(emailOptions);
    return response;
  }
}

module.exports = PasswordServices;