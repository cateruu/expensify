import 'dotenv/config';
import express from 'express';
import mainRouter from './routes/main.route';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});
