import express, { type Express } from 'express';
import router from './routes/questions.routes.js';
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/questions", router);

app.listen(port,()=>{
  console.log(`Servidor corriendo en el puerto,${port}`);
});