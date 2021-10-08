require('dotenv').config();
const app = require('./app.js');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);;
})