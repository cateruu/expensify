import { NextFunction, Request, Response } from 'express';
import { Token } from '../models/tokens.model';
import mongoose from 'mongoose';
import { ForbiddenError } from '../errors/forbidden.error';
import { UnAuthorizedError } from '../errors/unathorized.error';

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
    throw new UnAuthorizedError('Permission denied');
  }

  const tokenDoc = await Token.findOne({ access: token }).populate('userId');
  if (!tokenDoc || tokenDoc.accessExpires < new Date()) {
    throw new ForbiddenError('Invalid or Expired access token');
  }

  req.userId = tokenDoc.userId;
  next();
};
