import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json(
      await Post.find().populate([
        { path: 'user', select: 'name avatar' },
        { path: 'comments', populate: 'user replies' },
        {
          path: 'expressions',
          populate: [
            {
              path: 'angry',
              select: 'name avatar',
            },
            {
              path: 'disgust',
              select: 'name avatar',
            },
            {
              path: 'fear',
              select: 'name avatar',
            },
            {
              path: 'happy',
              select: 'name avatar',
            },
            {
              path: 'like',
              select: 'name avatar',
            },
            {
              path: 'love',
              select: 'name avatar',
            },
            {
              path: 'sad',
              select: 'name avatar',
            },
            {
              path: 'support',
              select: 'name avatar',
            },
            {
              path: 'surprise',
              select: 'name avatar',
            },
          ],
        },
      ])
    )
);
