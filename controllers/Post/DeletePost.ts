import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import Comment from '../../models/Comment/Comment';
import { getUserId } from '../../constants/UserId';
import Reply from '../../models/Comment/Reply';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    let post = await Post.findById(postId);
    if (!post)
      return next(
        new ErrorHandler(404, `Couldn't Find Post With Id => ${postId}`)
      );

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    if (post.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, It seems that you're not the owner of this post",
      });

    let commentsId = new Set();
    let repliesId = new Set();
    let usersWhoReacted = new Set();
    let usersWhoCommented = new Set();
    let usersWhoReplied = new Set();
    let usersWhoShared = new Set();

    //* Get All User Who Reacted
    // TODO: Like
    for (let i = 0; i < post.expressions.like.length; i++) {
      usersWhoReacted.add(post.expressions.like[i]);
    }

    // TODO: Love
    for (let i = 0; i < post.expressions.love.length; i++) {
      usersWhoReacted.add(post.expressions.love[i]);
    }

    // TODO: Support
    for (let i = 0; i < post.expressions.support.length; i++) {
      usersWhoReacted.add(post.expressions.support[i]);
    }

    // TODO: Sad
    for (let i = 0; i < post.expressions.sad.length; i++) {
      usersWhoReacted.add(post.expressions.sad[i]);
    }

    // TODO: Happy
    for (let i = 0; i < post.expressions.happy.length; i++) {
      usersWhoReacted.add(post.expressions.happy[i]);
    }

    // TODO: Angry
    for (let i = 0; i < post.expressions.angry.length; i++) {
      usersWhoReacted.add(post.expressions.angry[i]);
    }

    // TODO: Disgust
    for (let i = 0; i < post.expressions.disgust.length; i++) {
      usersWhoReacted.add(post.expressions.disgust[i]);
    }

    // TODO: Surprise
    for (let i = 0; i < post.expressions.surprise.length; i++) {
      usersWhoReacted.add(post.expressions.surprise[i]);
    }

    // TODO: Fear
    for (let i = 0; i < post.expressions.fear.length; i++) {
      usersWhoReacted.add(post.expressions.fear[i]);
    }

    //* Get All Users Who Comments
    // TODO: Comments Loop
    for (let i = 0; i < post.comments.length; i++) {
      const comment = await Comment.findById(
        post.comments[i].toString()
      ).select('user replies _id');

      commentsId.add(comment._id);
      usersWhoCommented.add(comment.user.toString());

      // TODO: Comment Replies Loop
      for (let j = 0; j < comment.replies.length; j++) {
        const reply = await Reply.findById(
          comment.replies[j].toString()
        ).select('user _id');
        repliesId.add(reply._id);
        usersWhoReplied.add(reply.user.toString());
      }
    }

    //* Get All Users Who Shared
    // TODO: Share Loop
    for (let i = 0; i < post.shares.length; i++) {
      usersWhoShared.add(post.shares[i].toString());
    }

    //! Delete Expression from usersWhoReacted
    for (let userId of usersWhoReacted) {
      const user = await User.findById(userId).select('posts');
      user.posts.reacted.forEach(async (post) => {
        if (post.toString() === postId) {
          user.posts.reacted.splice(user.posts.reacted.indexOf(post), 1);
          await user.save();
        }
      });
    }

    //! Delete the Comments from usersWhoCommented
    for (let userId of usersWhoCommented) {
      const user = await User.findById(userId).select('comments');
      user.comments.reacted.forEach(async (comment) => {
        if (comment.ref.post.toString() === postId) {
          user.comments.reacted.splice(
            user.comments.reacted.indexOf(comment),
            1
          );
          await user.save();
        }
      });
      user.comments.published.forEach(async (comment) => {
        if (comment.ref.post.toString() === postId) {
          user.comments.published.splice(
            user.comments.published.indexOf(comment),
            1
          );
          await user.save();
        }
      });
    }

    //! Delete the Replies from usersWhoReplied
    for (let userId of usersWhoReplied) {
      const user = await User.findById(userId).select('replies');
      user.replies.reacted.forEach(async (reply) => {
        if (reply.ref.toString() === postId) {
          user.replies.reacted.splice(user.replies.reacted.indexOf(reply), 1);
          await user.save();
        }
      });
      user.replies.published.forEach(async (reply) => {
        if (reply.ref.toString() === postId) {
          user.replies.published.splice(
            user.replies.published.indexOf(reply),
            1
          );
          await user.save();
        }
      });
    }

    //! Delete Shares from usersWhoShared
    for (let userId of usersWhoShared) {
      const user = await User.findById(userId).select('shares');
      user.shares.posts.forEach(async (post) => {
        if (post.toString() === postId) {
          user.shares.posts.splice(user.shares.posts.indexOf(post), 1);
          await user.save();
        }
      });
    }

    //* Delete All Post Comments
    for (let comment of commentsId) {
      await Comment.findByIdAndRemove(comment.toString());
    }

    //* Delete All Post Replies
    for (let reply of repliesId) {
      await Reply.findByIdAndRemove(reply.toString());
    }

    user.posts.published.splice(user.posts.published.indexOf(postId), 1),
      await user.save();

    //* Delete the Post
    await Post.findByIdAndRemove(postId);

    return res
      .status(200)
      .json({ success: true, msg: 'Post Deleted Successfully' });
  }
);
