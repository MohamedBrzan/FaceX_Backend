import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Post from '../../models/Post/Post';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) return res.json(post);
    return next(new ErrorHandler(404, `Couldn't Find ${id}`));
  }
);
