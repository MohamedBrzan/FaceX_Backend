import { Schema, model, Types } from 'mongoose';
import HashTag from '../../Interfaces/HashTag/HashTag';

const hashTagSchema = new Schema<HashTag>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    followers: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model('HashTag', hashTagSchema);
