import { Schema, model, Types } from 'mongoose';
import Comment from '../../Interfaces/Comment/Comment';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const commentSchema = new Schema<Comment>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    ref: {
      post: { type: Types.ObjectId, ref: 'Post' },
      blog: { type: Types.ObjectId, ref: 'Blog' },
      reel: { type: Types.ObjectId, ref: 'Reel' },
    },
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
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

export default model('Comment', commentSchema);
