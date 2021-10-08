const {Router} = require('express');
const {validateToken} = require('../middlewares/auth.middleware');
const usersCtrl = require('../controllers/users.controllers.js')

const router = Router();
// Obtener todos los usuarios
router.get('/users', usersCtrl.getAllUsers);
// Obtener usuario por ID
router.get('/users/:id', usersCtrl.getUserById);
// Crear un usuario
router.post('/users', usersCtrl.createUser);
// Editar usuario -> se nececita estar autenticado
router.put('/users/:id', validateToken, usersCtrl.updateUser);
// Borrar usuario
router.delete('/users/:id', validateToken, usersCtrl.deleteUser);

module.exports = router;