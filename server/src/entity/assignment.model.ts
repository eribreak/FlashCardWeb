import { Document, Schema, Types, model } from 'mongoose';

export interface IAnswer {
  content: string;
  date: string;
}

export interface IAssignment extends Document {
  _id: string | Types.ObjectId;
  question: string;
  due?: string;
  answers?: [IAnswer];
}

// Define the schema for user document
export const AssignmentSchema = new Schema<IAssignment>({
  question: { type: String },
  due: { type: String },
  answers: { type: [Schema.Types.Mixed] },
});

const AssignmentModel = model<IAssignment>('Assignment', AssignmentSchema);
