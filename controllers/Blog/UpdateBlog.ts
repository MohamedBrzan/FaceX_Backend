import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Blog from '../../models/Blog/Blog';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog)
      return next(new ErrorHandler(404, `Couldn't Find Blog With Id => ${id}`));

    blog = await Blog.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.json(blog);
  }
);
