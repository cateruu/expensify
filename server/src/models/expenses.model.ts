import mongoose, { model, Schema } from 'mongoose';
import { Expense } from '../interfaces/expenses.interface';

const expensesSchema = new Schema<Expense>({
  name: { type: String, required: [true, 'name is required'] },
  type: { type: String, required: [true, 'type is required'] },
  amount: { type: Number, required: [true, 'amount is required'] },
  date: { type: Date, required: [true, 'date is required'] },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'userId is required'],
  },
  createdAt: { type: Date, default: new Date() },
});

expensesSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});

export const Expenses = model<Expense>('Expenses', expensesSchema);
