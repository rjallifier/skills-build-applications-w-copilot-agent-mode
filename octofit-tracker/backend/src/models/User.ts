import { model, Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  level: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('User', userSchema);
