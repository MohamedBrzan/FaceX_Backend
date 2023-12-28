import { Schema, model, Types } from 'mongoose';
import Reel from '../../Interfaces/Reel/Reel';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const reelSchema = new Schema<Reel>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    image: [{ type: Types.ObjectId, ref: 'Image' }],
    video: [{ type: Types.ObjectId, ref: 'Video' }],
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
    views: [{ type: Types.ObjectId, ref: 'User' }],
    shares: [{ type: Types.ObjectId, ref: 'User' }],
    saves: [{ type: Types.ObjectId, ref: 'User' }],
    visiblePrivacy: {
      type: String,
      enum: VisiblePrivacy,
      required: true,
      default: VisiblePrivacy.public,
    },
  },
  { timestamps: true }
);

export default model('Reel', reelSchema);
