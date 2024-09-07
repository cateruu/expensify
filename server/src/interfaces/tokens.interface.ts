import mongoose, { Document } from 'mongoose';

export interface TokenPair extends Document {
  userId: mongoose.ObjectId;
  access: string;
  refresh: string;
  accessExpires: Date;
  refreshExpires: Date;
}
