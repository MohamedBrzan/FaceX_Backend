import { Schema, model, Types } from 'mongoose';
import Video from '../../Interfaces/Video/Video';

const videoSchema = new Schema<Video>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    video: { type: String, required: true },
    ref: { type: Types.ObjectId, ref: 'Album' },
  },
  { timestamps: true }
);

export default model('Video', videoSchema);
