import { Document, Schema, Types, model } from 'mongoose';

export interface IUser extends Document {
  _id: string | Types.ObjectId;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  collectionsId?: [string | Types.ObjectId];
}

// Define the schema for user document
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  collectionsId: { type: [String], default: [], required: true },
});

// Create and export the User model
const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
