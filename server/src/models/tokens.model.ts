import mongoose, { model, Schema } from 'mongoose';
import { TokenPair } from '../interfaces/tokens.interface';

const tokenSchema = new Schema<TokenPair>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'userId is required'],
  },
  access: { type: String, required: [true, 'access token is required'] },
  refresh: { type: String, required: [true, 'refresh token is required'] },
  accessExpires: { type: Date, required: [true, 'accessExpires is required'] },
  refreshExpires: {
    type: Date,
    required: [true, 'refreshExpires is required'],
  },
});

export const Token = model<TokenPair>('tokens', tokenSchema);
