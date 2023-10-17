import mongoose, { Schema, model } from 'mongoose';
import Image from '../../Interfaces/Image/Image';

const imageSchema = new Schema<Image>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    ref: { type: mongoose.Types.ObjectId, ref: 'Album', required: true },
  },
  { timestamps: true }
);

export default model('Image', imageSchema);
