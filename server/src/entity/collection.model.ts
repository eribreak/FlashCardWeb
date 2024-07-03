import { Document, Schema, Types, model } from 'mongoose';

export interface IFlashCard {
  front_text: string;
  front_img: string;
  back_text: string;
  back_img: string;
}

export interface ICollections extends Document {
  _id: string | Types.ObjectId;
  name: string;
  description?: string;
  summary?: string;
  flashCard?: [IFlashCard];
}

// Define the schema for user document
const CollectionSchema = new Schema<ICollections>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  summary: { type: String },
  flashCard: { type: [Schema.Types.Mixed] },
});

const CollectionModel = model<ICollections>('Collection', CollectionSchema);

export default CollectionModel;
