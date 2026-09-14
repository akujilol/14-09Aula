
const express = require('express');
const equipamentoRoutes = require('./routes/equipamentoRoutes');

const app = express();
app.use(express.json());
app.use('/equipamentos', equipamentoRoutes);

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${3000}`);
});