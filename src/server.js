import express from 'express';
import { equipRouter } from './routes/equipamento.route.js';

const app = express();
app.use(express.json());
app.use('/equipamentos', equipRouter);

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${3000}`);
});