import 'dotenv/config';
import express from 'express';
import mainRouter from './routes/main.route';
import usersRouter from './routes/users.route';
import expensesRouter from './routes/expenses.route';
import { connect } from 'mongoose';
import { errorHandler } from './middlewares/errors.middleware';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

(async () => {
  try {
    await connect(process.env.MONGO_DB_URI || '');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
})();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});
