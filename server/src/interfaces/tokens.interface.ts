import mongoose from 'mongoose';

export interface TokenPair {
  userId: mongoose.ObjectId;
  access: string;
  refresh: string;
  accessExpires: Date;
  refreshExpires: Date;
}
