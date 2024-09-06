import express from 'express';
import { User } from '../interfaces/user.inteface';
import { Users } from '../models/users.model';
import { userValidation } from '../validation/users.validation';
import { ZodError } from 'zod';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.json(allUsers);
  } catch (error) {
    res.status(404).json({ message: 'users not found' });
  }
});

router.post('/', async (req, res) => {
  const user: User = req.body;
  try {
    userValidation.parse(user);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(error.flatten().fieldErrors);
      return;
    }
  }

  try {
    const addedUser = await Users.create(user);
    res.json(addedUser);
    await addedUser.save();
  } catch (error) {
    throw new Error('unable to create new user');
  }
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
