import { Schema, model, Types } from 'mongoose';
import User from '../../Interfaces/User/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Gender from '../../enums/Gender';
import Role from '../../enums/Role';

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    images: [{ type: Types.ObjectId, ref: 'Image' }],
    albums: [{ type: Types.ObjectId, ref: 'Album' }],
    videos: [{ type: Types.ObjectId, ref: 'Video' }],
    payments: [{ type: Types.ObjectId, ref: 'Payment' }],
    comments: [{ type: Types.ObjectId, ref: 'Comments' }],
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
    avatar: { type: String },
    cover: { type: String },
    bio: { type: String },
    actively_recruiting: { type: Boolean, default: false },
    gender: { type: String, enum: Gender },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.User,
    },
    followers: [{ type: Types.ObjectId, ref: 'User' }],
    followings: [{ type: Types.ObjectId, ref: 'User' }],
    hashTags: {
      create: [{ type: Types.ObjectId, ref: 'HashTag' }],
      follow: [{ type: Types.ObjectId, ref: 'HashTag' }],
    },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    blogs: [{ type: Types.ObjectId, ref: 'Blog' }],
    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    isVerified: { type: Boolean, default: false },
    ads: [{ type: Types.ObjectId, ref: 'Ads' }],
    reels: [{ type: Types.ObjectId, ref: 'Reels' }],
    notifications: [{ type: Types.ObjectId, ref: 'Notification' }],
    saved: [{ type: Types.ObjectId }],
    location: { type: String },
    website: { type: String },
    github: { type: String },
    deletion: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash Password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Match Password to hashed password in database
// UserSchema.methods.passwordValidation = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Generate Token for UserSchema
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default model('User', UserSchema);
