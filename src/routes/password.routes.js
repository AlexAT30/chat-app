const {Router} = require('express');
const {passRecover} = require('../controllers/password.controllers');

const router = Router();

router.post('/forget-pass', passRecover);

module.exports = router;

