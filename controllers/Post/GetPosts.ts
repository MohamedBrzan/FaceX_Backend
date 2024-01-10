import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json(await Post.find().populate('user'))
);
