import { Document, Schema, Types, model } from 'mongoose';

interface ISession extends Document {
  _id: string | Types.ObjectId;
  user_id: string | Types.ObjectId;
  sessions: string[];
}

// Define the schema for session document
const SessionSchema = new Schema<ISession>({
  _id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  sessions: { type: [String], default: [] },
});

// Create and export the Session model
const SessionModel = model<ISession>('Session', SessionSchema);

export default SessionModel;
