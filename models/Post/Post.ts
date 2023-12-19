import { Schema, model, Types } from 'mongoose';
import Post from '../../Interfaces/Post/Post';
import PostStatus from '../../enums/PostStatus';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const PostSchema = new Schema<Post>(
  {
    images: [{ type: String }],
    videos: [{ type: String }],
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: PostStatus,
      default: PostStatus.Active,
      required: true,
    },
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
    visiblePrivacy: {
      type: String,
      enum: VisiblePrivacy,
      default: VisiblePrivacy.public,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Post', PostSchema);
