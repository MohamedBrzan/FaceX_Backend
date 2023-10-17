import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Blog from '../../models/Blog/Blog';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    let blog = await Blog.create({ user: req['user']._id, title, content });

    let user = await User.findById(req['user']._id);

    if (!user) {
      await Blog.findByIdAndRemove(blog['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['user']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['user']._id, {
      $push: {
        blogs: blog['_id'],
      },
    });

    return res.status(200).json(blog);
  }
);
