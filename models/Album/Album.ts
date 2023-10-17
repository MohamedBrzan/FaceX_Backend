import mongoose, { Schema, model } from 'mongoose';
import Album from '../../Interfaces/Album/Album';

const albumSchema = new Schema<Album>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: mongoose.Types.ObjectId, ref: 'Image' }],
  },
  { timestamps: true }
);

export default model('Album', albumSchema);
