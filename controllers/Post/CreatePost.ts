import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    let post = await Post.create({ user: req['authorizedUser']._id, title, content });

    let user = await User.findById(req['authorizedUser']._id);

    if (!user) {
      await Post.findByIdAndRemove(post['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['authorizedUser']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['authorizedUser']._id, {
      $push: {
        posts: post['_id'],
      },
    });

    return res.status(200).json(post);
  }
);
