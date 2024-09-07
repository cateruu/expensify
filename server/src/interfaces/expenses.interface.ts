import mongoose, { Document } from 'mongoose';

export interface Expense extends Document {
  _id: mongoose.ObjectId;
  name: string;
  type: string;
  amount: number;
  date: Date;
  createdAt: Date;
  userId: mongoose.ObjectId;
}
