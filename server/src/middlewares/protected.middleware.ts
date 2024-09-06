import { NextFunction, Request, Response } from 'express';
import { Token } from '../models/tokens.model';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      userId?: mongoose.Schema.Types.ObjectId;
    }
  }
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Permission denied' });
  }

  const tokenDoc = await Token.findOne({ access: token }).populate('userId');
  if (!tokenDoc || tokenDoc.accessExpires < new Date()) {
    return res.status(403).json({ message: 'Invalid or Expired access token' });
  }

  req.userId = tokenDoc.userId;
  next();
};
