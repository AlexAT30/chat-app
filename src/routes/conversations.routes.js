const {Router} = require('express');

const conversationsCtrl = require('../controllers/conversations.controllers')

const router = Router();
// Obtener todas las conversaciones
router.get('/conversations', conversationsCtrl.getAll);
// Obtener una conversacion por id
router.get('/conversations/:id', conversationsCtrl.getById);
// Crear una conversacion
router.post('/conversations', conversationsCtrl.create);
// Actualizar una conversacion
router.put('/conversations/:id', conversationsCtrl.update);
// Borrar una conversacion
router.delete('/conversations/:id', conversationsCtrl.delete);
// relaciones con otros modelos
/// Usuario
router.get('/conversations/:id/users', conversationsCtrl.users);
/// Participantes
router.get('/conversations/:id/participants', conversationsCtrl.participants);
/// Mensajes
router.get('/conversations/:id/messages', conversationsCtrl.messages);

module.exports = router;