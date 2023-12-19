import { Schema, model, Types } from 'mongoose';
import Reply from '../../Interfaces/Comment/Reply';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const replySchema = new Schema<Reply>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    ref: { type: Types.ObjectId, ref: 'Comment' },
    reply: { type: String, required: true },
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
      default: VisiblePrivacy.public,
    },
  },
  { timestamps: true }
);

export default model('Reply', replySchema);
