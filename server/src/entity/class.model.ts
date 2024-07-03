import { Document, Schema, Types, model } from 'mongoose';
import { AssignmentSchema, IAssignment } from './assignment.model';

interface Post {
  content: string;
  date: string;
}

interface IClass extends Document {
  _id: string | Types.ObjectId;
  name: string;
  images?: string;
  hostId?: string | Types.ObjectId;
  students?: [string | Types.ObjectId];
  posts?: [Post];
  collections?: [string | Types.ObjectId];
  assignments?: [IAssignment];
}

// Define the schema for user document
const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true },
  images: { type: String },
  hostId: { type: String, required: true },
  students: { type: Schema.Types.Mixed },
  posts: { type: [Schema.Types.Mixed] },
  collections: { type: [Schema.Types.ObjectId] },
  assignments: { type: [AssignmentSchema] },
});

const ClassModel = model<IClass>('Class', ClassSchema);
