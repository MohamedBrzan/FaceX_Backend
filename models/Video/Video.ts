import mongoose, { Schema, model } from 'mongoose';
import Video from '../../Interfaces/Video/Video';

const videoSchema = new Schema<Video>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    video: { type: String, required: true },
    ref: { type: mongoose.Types.ObjectId, ref: 'Album' },
  },
  { timestamps: true }
);

export default model('Video', videoSchema);
