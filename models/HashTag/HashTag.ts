import mongoose, { Schema, model } from 'mongoose';
import HashTag from '../../Interfaces/HashTag/HashTag';

const hashTagSchema = new Schema<HashTag>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model('HashTag', hashTagSchema);
