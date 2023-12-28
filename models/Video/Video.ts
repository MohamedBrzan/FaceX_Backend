import { Schema, model, Types } from 'mongoose';
import Video from '../../Interfaces/Video/Video';

const videoSchema = new Schema<Video>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    video: { type: String, required: true },
    views: [{ type: Types.ObjectId, ref: 'User' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    expressions: {
      like: { type: Number, required: true, default: 0 },
      love: { type: Number, required: true, default: 0 },
      support: { type: Number, required: true, default: 0 },
      sad: { type: Number, required: true, default: 0 },
      happy: { type: Number, required: true, default: 0 },
      angry: { type: Number, required: true, default: 0 },
      disgust: { type: Number, required: true, default: 0 },
      surprise: { type: Number, required: true, default: 0 },
      fear: { type: Number, required: true, default: 0 },
    },
    shares: [{ type: Types.ObjectId, ref: 'User' }],
    saves: [{ type: Types.ObjectId, ref: 'User' }],
    ref: { type: Types.ObjectId, ref: 'Album' },
  },
  { timestamps: true }
);

export default model('Video', videoSchema);
