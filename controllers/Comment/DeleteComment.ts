import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref, commentId } = req.body;

    const userId = (await getUserId(req)).toString();

    let refName: string;
    let refComments: any[];

    // todo search if The Comment For Post | Blog | Reel

    //* Remove Comment From Post
    if (ref.post) {
      let comment = await Comment.findById(commentId);

      if (!comment)
        return next(
          new ErrorHandler(404, `This Post Comment Id ${comment} Not Found`)
        );

      let post = await Post.findByIdAndUpdate(
        ref.post,
        {
          $pull: {
            comments: commentId,
          },
        },
        { runValidators: true, new: true }
      );
      await Comment.findByIdAndRemove(comment);

      const { comments } = post;
      refComments = comments;
      refName = 'post';

      //* Remove Comment From Blog
    } else if (ref.blog) {
      let comment = await Comment.findById(commentId);

      if (!comment)
        return next(
          new ErrorHandler(404, `This Blog Comment Id ${comment} Not Found`)
        );

      let blog = await Blog.findByIdAndUpdate(
        ref.blog,
        {
          $pull: {
            comments: commentId,
          },
        },
        { runValidators: true, new: true }
      );

      await Comment.findByIdAndRemove(comment);

      const { comments } = blog;
      refComments = comments;
      refName = 'blog';

      //* Remove Comment From Reel
    } else if (ref.reel) {
      let comment = await Comment.findById(commentId);

      if (!comment)
        return next(
          new ErrorHandler(404, `This Reel Comment Id ${comment} Not Found`)
        );

      let reel = await Reel.findByIdAndUpdate(
        ref.reel,
        {
          $pull: {
            comments: commentId,
          },
        },
        { runValidators: true, new: true }
      );

      await Comment.findByIdAndRemove(comment);

      const { comments } = reel;
      refComments = comments;
      refName = 'reel';
    }

    if (!refName || !refComments)
      return res.status(404).json({ message: `cannot find this ref ${ref}` });

    //* Remove Comment From User Comments

    await User.findByIdAndUpdate(
      userId,
      { $pull: { 'comments.published': commentId } },
      { runValidators: true, new: true }
    );

    return res.status(200).json({
      message: `deleted comment ${commentId} successfully from ${refName}`,
      [`${refName} comments`]: refComments,
    });
  }
);
