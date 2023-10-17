import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import Comment from '../../models/Comment/Comment';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let post = await Post.findById(id);
    if (!post)
      return next(new ErrorHandler(404, `Couldn't Find Post With Id => ${id}`));

    let user = await User.findById(req['user']._id);

    const postIndex = user.posts.findIndex(
      (post) => post['_id'].toString() === id
    );

    if (postIndex >= 0) {
      user.posts.splice(postIndex, 1);
      await user.save();
      //* Delete All Post Comments
      for (let i = 0; i < post.comments.length; i++) {
        await Comment.findByIdAndRemove(post.comments[i].toString());
      }
      await Post.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Post Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Post",
    });
  }
);
