import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import { getUserId } from '../../constants/UserId';
import Reply from '../../models/Comment/Reply';
import DeleteUsersFromModel from '../../constants/DeleteUsersFromModel';
import ExpressionLoop from '../../constants/ExpressionLoop';
import CheckAndRemove from '../../constants/CheckAndRemove';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref, commentId } = req.body;

    const userId = (await getUserId(req)).toString();

    let comment = await Comment.findById(commentId);

    if (!comment)
      return next(
        new ErrorHandler(404, `This Reel Comment Id ${comment} Not Found`)
      );

    if (userId !== comment.user.toString())
      return next(
        new ErrorHandler(
          404,
          "Sorry!!, It seems that you're not the owner of this comment"
        )
      );

    let refName: string;
    let refComments: any[];

    // todo search if The Comment For Post | Blog | Reel

    //* Remove Comment From Post
    if (ref.post) {
      //! Delete Reply From user.replies
      await DeleteUsersFromModel(Reply, comment, 'replies');

      let post = await Post.findByIdAndUpdate(
        ref.post,
        {
          $pull: {
            comments: commentId,
          },
        },
        { runValidators: true, new: true }
      );

      const { comments } = post;
      refComments = comments;
      refName = 'post';

      //* Remove Comment From Blog
    } else if (ref.blog) {
      //! Delete Reply From user.replies
      await DeleteUsersFromModel(Reply, comment, 'replies');

      let blog = await Blog.findByIdAndUpdate(
        ref.blog,
        {
          $pull: {
            comments: commentId,
          },
        },
        { runValidators: true, new: true }
      );

      const { comments } = blog;
      refComments = comments;
      refName = 'blog';

      //* Remove Comment From Reel
    } else if (ref.reel) {
      //! Delete Reply From user.replies
      await DeleteUsersFromModel(Reply, comment, 'replies');

      let reel = await Reel.findByIdAndUpdate(
        ref.reel,
        {
          $pull: {
            comments: commentId,
          },
        },
        { runValidators: true, new: true }
      );

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
      { runValidators: true, new: true, upsert: true }
    );

    const users = ExpressionLoop(comment);

    for (const targetUser of users) {
      const user = await User.findById(targetUser).select('comments');
      CheckAndRemove(user, 'comments', commentId);
      await user.save();
    }

    await Comment.findByIdAndRemove(comment);

    return res.status(200).json({
      message: `deleted comment ${commentId} successfully from ${refName}`,
      [`${refName} comments`]: refComments,
    });
  }
);
