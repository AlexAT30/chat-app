const express = require('express');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
const usersRoutes = require('./routes/users.routes');
const authRoute = require('./routes/auth.routes');
const conversationsRoutes = require('./routes/conversations.routes');
const passRoutes = require('./routes/password.routes');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', usersRoutes);
app.use('/api/v1', authRoute);
app.use('/api/v1', conversationsRoutes);
app.use('/api/v1', passRoutes);

module.exports = app;