import express from 'express';
import { verifyAccessToken } from '../middlewares/protected.middleware';
import { Expenses } from '../models/expenses.model';
import { Expense } from '../interfaces/expenses.interface';
import { expenseValidation } from '../validation/expenses.validation';
import { ZodError } from 'zod';
import { Error } from 'mongoose';
import { NotFoundError } from '../errors/notFound.error';
import { BadRequestError } from '../errors/badRequest.error';
import { ForbiddenError } from '../errors/forbidden.error';

const router = express.Router();

router.use(verifyAccessToken);

router.get('/', async (req, res) => {
  const expenses = await Expenses.find({ userId: req.userId });

  if (expenses.length <= 0) {
    throw new NotFoundError('expenses not found');
  }

  res.json(expenses);
});

router.post('/', async (req, res) => {
  const expense: Expense = req.body;
  expense.date = new Date(expense.date);

  try {
    expenseValidation.parse(expense);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BadRequestError(
        'failed validation',
        error.flatten().fieldErrors
      );
    }
  }

  try {
    const expenseDoc = await Expenses.create(expense);
    expenseDoc.save();
    res.json(expenseDoc);
  } catch (error) {
    if (error instanceof Error) {
      throw new ForbiddenError(error.message);
    }
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const expense = await Expenses.findById(id);

    if (!expense) {
      throw new NotFoundError('expenses not found');
    }

    res.json(expense);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Cast to ObjectId failed')) {
        throw new NotFoundError('expenses not found');
      }
    }
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, type, amount, date }: Expense = req.body;

  try {
    const expenseDoc = await Expenses.findById(id);

    if (!expenseDoc) {
      throw new NotFoundError('expenses not found');
    }

    if (name) {
      expenseDoc.name = name;
    }
    if (type) {
      expenseDoc.type = type;
    }
    if (amount) {
      expenseDoc.amount = amount;
    }
    if (date) {
      expenseDoc.date = date;
    }

    await expenseDoc.save();
    res.json(expenseDoc);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Cast to ObjectId failed')) {
        throw new NotFoundError('expenses not found');
      }
    }
  }

  console.log(name, type, amount, date);
  res.json();
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Expenses.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: true });
  }
});

export default router;
