import express from 'express';
import { User } from '../interfaces/user.inteface';
import { Users } from '../models/users.model';
import { userValidation } from '../validation/users.validation';
import { ZodError } from 'zod';
import { generateToken } from '../utils/generateToken';
import { Token } from '../models/tokens.model';

const router = express.Router();

router.post('/register', async (req, res) => {
  const user: User = req.body;
  try {
    userValidation.parse(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error.flatten().fieldErrors);
    }
  }

  try {
    const addedUser = await Users.create(user);
    res.status(201).json(addedUser);
    await addedUser.save();
  } catch (error) {
    throw new Error('unable to create new user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password }: User = req.body;

  const user = await Users.findOne({ email }, 'password');
  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateToken();
  const refreshToken = generateToken();

  const newToken = new Token({
    access: accessToken,
    refresh: refreshToken,
    accessExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    refreshExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 day
    userId: user._id,
  });

  await newToken.save();

  res.json({ accessToken, refreshToken });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  const tokenDoc = await Token.findOne({ refresh: refreshToken }).populate(
    'userId'
  );

  if (!tokenDoc || tokenDoc.refreshExpires < new Date()) {
    return res
      .status(403)
      .json({ message: 'Invalid or Expired refresh token' });
  }

  const newAccessToken = generateToken();
  const newRefreshToken = generateToken();

  tokenDoc.access = newAccessToken;
  tokenDoc.refresh = newAccessToken;
  tokenDoc.accessExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  tokenDoc.refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await tokenDoc.save();

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json('server error');
  }
});

export default router;
