import { NextFunction, Request, Response } from 'express';
import DeleteUsersFromModel from '../constants/DeleteUsersFromModel';
import ExpressionLoop from '../constants/ExpressionLoop';
import ErrorHandler from '../middleware/ErrorHandler';
import Blog from '../models/Blog/Blog';
import Comment from '../models/Comment/Comment';
import Reply from '../models/Comment/Reply';
import Post from '../models/Post/Post';
import Reel from '../models/Reel/Reel';
import User from '../models/User/User';
import CommentInterface from '../Interfaces/Comment/Comment';

export default async (

  ref: any,
  comment: CommentInterface,
  userId: string
): Promise<{ refName: string; refComments: any[] }> => {
  let refName: string;
  let refComments: any[];

  // todo search if The Comment For Post | Blog | Reel

  //* Remove Comment From Post
  if (ref.post) {
    let post = await Post.findByIdAndUpdate(
      ref.post,
      {
        $pull: {
          comments: comment['_id'],
        },
      },
      { runValidators: true, new: true }
    );

    const { comments } = post;
    refComments = comments;
    refName = 'post';

    //* Remove Comment From Blog
  } else if (ref.blog) {
    let blog = await Blog.findByIdAndUpdate(
      ref.blog,
      {
        $pull: {
          comments: comment['_id'],
        },
      },
      { runValidators: true, new: true }
    );

    const { comments } = blog;
    refComments = comments;
    refName = 'blog';

    //* Remove Comment From Reel
  } else if (ref.reel) {
    let reel = await Reel.findByIdAndUpdate(
      ref.reel,
      {
        $pull: {
          comments: comment['_id'],
        },
      },
      { runValidators: true, new: true }
    );

    const { comments } = reel;
    refComments = comments;
    refName = 'reel';
  }

  const users = ExpressionLoop(comment);

  for (const targetUser of users) {
    const user = await User.findById(targetUser).select('comments');
    //! Delete the comment from user.comments.reacted
    user.comments.reacted.splice(user.comments.reacted.indexOf(comment), 1);
    await user.save();
  }

  //! Delete Reply From user.replies.reacted & Delete the reply's writer
  await DeleteUsersFromModel(Reply, comment, 'replies');

  //* Remove Comment Writer
  await User.findByIdAndUpdate(
    userId,
    { $pull: { 'comments.published': comment['_id'] } },
    { runValidators: true, new: true, upsert: true }
  );

  await Comment.findByIdAndRemove(comment);

  return { refName, refComments };
};
