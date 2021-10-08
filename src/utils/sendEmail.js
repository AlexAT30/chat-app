require('dotenv').config();
const nodemailer = require('nodemailer');
const google = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const createTransporter = async () => {
  const oAuthClient = new google.Auth.OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuthClient.setCredentials({
    refresh_token: REFRESH_TOKEN
  });

  const accessToken = await oAuthClient.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'oauth2',
      user: 'marioalejandro300402@gmail.com',
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  });
  return transporter;
}

const sendEmail = async (mailOptions) => {
  const transporter = await createTransporter();
  const response = await transporter.sendMail(mailOptions);
  return response;
}

module.exports = sendEmail;