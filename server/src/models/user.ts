import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  username: string;
  password: string;
  validateCredentials(plainPassword: string, usernameInput: string): Promise<boolean>; 
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
});

userSchema.methods.validateCredentials = async function (plainPassword: string, usernameInput: string): Promise<boolean> {
  const correctPass = await bcrypt.compare(plainPassword, this.password);
  return correctPass && usernameInput === this.username;
};


const User = model<IUser>('User', userSchema);

export default User;