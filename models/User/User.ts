import mongoose, { Schema, model, mongo } from 'mongoose';
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
    images: [{ type: mongoose.Types.ObjectId, ref: 'Image' }],
    albums: [{ type: mongoose.Types.ObjectId, ref: 'Album' }],
    videos: [{ type: mongoose.Types.ObjectId, ref: 'Video' }],
    payments: [{ type: mongoose.Types.ObjectId, ref: 'Payment' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
    replies: [{ type: mongoose.Types.ObjectId, ref: 'Reply' }],
    avatar: { type: String },
    bio: { type: String },
    gender: { type: String, enum: Gender },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.User,
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    hashTags: {
      create: [{ type: mongoose.Types.ObjectId, ref: 'HashTag' }],
      follow: [{ type: mongoose.Types.ObjectId, ref: 'HashTag' }],
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    blogs: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
    isVerified: { type: Boolean, default: false },
    ads: [{ type: mongoose.Types.ObjectId, ref: 'Ads' }],
    reels: [{ type: mongoose.Types.ObjectId, ref: 'Reels' }],
    notifications: [{ type: mongoose.Types.ObjectId, ref: 'Notification' }],
    saved: [{ type: mongoose.Types.ObjectId }],
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
