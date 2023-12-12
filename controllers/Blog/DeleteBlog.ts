import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Blog from '../../models/Blog/Blog';
import User from '../../models/User/User';
import Comment from '../../models/Comment/Comment';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog)
      return next(new ErrorHandler(404, `Couldn't Find Blog With Id => ${id}`));

    let user = await User.findById(req['authorizedUser']._id);

    const blogIndex = user.blogs.findIndex(
      (blog) => blog['_id'].toString() === id
    );

    if (blogIndex >= 0) {
      user.blogs.splice(blogIndex, 1);
      await user.save();
      //* Delete All Blog Comments
      for (let i = 0; i < blog.comments.length; i++) {
        await Comment.findByIdAndRemove(blog.comments[i].toString());
      }
      await Blog.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Blog Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Blog",
    });
  }
);
