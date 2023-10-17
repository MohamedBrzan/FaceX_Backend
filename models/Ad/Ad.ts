import mongoose, { Schema, model } from 'mongoose';
import Ad from '../../Interfaces/Ad/Ad';

const adSchema = new Schema<Ad>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    images: [{ type: String }],
    videos: [{ type: String }],
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    tags: [{ type: String, required: true }],
    ages: {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
    },
    payment: { type: mongoose.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

export default model('Ad', adSchema);
