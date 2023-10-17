import mongoose, { Schema, model } from 'mongoose';
import Reel from '../../Interfaces/Reel/Reel';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const reelSchema = new Schema<Reel>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    image: [{ type: mongoose.Types.ObjectId, ref: 'Image' }],
    video: [{ type: mongoose.Types.ObjectId, ref: 'Video' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
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
    visiblePrivacy: {
      type: String,
      enum: VisiblePrivacy,
      required: true,
      default: VisiblePrivacy.Public,
    },
  },
  { timestamps: true }
);

export default model('Reel', reelSchema);
