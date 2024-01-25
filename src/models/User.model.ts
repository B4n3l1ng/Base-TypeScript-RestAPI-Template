import { Schema, model } from 'mongoose';
import { UserModel } from '../interfaces';

const userSchema = new Schema<UserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is requires.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.'],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserModel>('User', userSchema);
