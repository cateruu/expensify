import { model, Schema } from 'mongoose';
import { User } from '../interfaces/user.inteface';
import bcrypt from 'bcryptjs';

const usersSchema = new Schema<User>({
  name: { type: String, required: [true, 'name is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  password: {
    type: String,
    select: false,
    required: [true, 'password is required'],
    minlength: [6, 'password must be at least 6 characters long'],
  },
});

usersSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;

    return ret;
  },
});

usersSchema.pre<User>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

usersSchema.methods.comparePassword = function (plaintextPassword: string) {
  return bcrypt.compare(plaintextPassword, this.password);
};

export const Users = model<User>('Users', usersSchema);
