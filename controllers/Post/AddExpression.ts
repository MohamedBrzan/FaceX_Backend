import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expression, postId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let post = await Post.findById(postId);

    if (!post) return next(new ErrorHandler(404, 'this post not exists'));

    const findPostInUser = user.posts.reacted.findIndex(
      (p) => p.toString() === postId
    );

    if (findPostInUser === -1 && post.user.toString() !== userId) {
      user.posts.reacted.push(postId);
      await user.save();
    }

    let found: boolean = false;

    if (!post.expressions[expression])
      return next(new ErrorHandler(404, 'expression string not found'));

    do {
      // TODO // Search for userId in the like expression
      for (let i = 0; i < post.expressions.like.length; i++) {
        if (userId === post.expressions.like[i].toString()) {
          post.expressions.like.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the love expression
      for (let i = 0; i < post.expressions.love.length; i++) {
        if (userId === post.expressions.love[i].toString()) {
          post.expressions.love.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the support expression
      for (let i = 0; i < post.expressions.support.length; i++) {
        if (userId === post.expressions.support[i].toString()) {
          post.expressions.support.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the sad expression
      for (let i = 0; i < post.expressions.sad.length; i++) {
        if (userId === post.expressions.sad[i].toString()) {
          post.expressions.sad.splice(i, 1);
          await post.save();
          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the happy expression
      for (let i = 0; i < post.expressions.happy.length; i++) {
        if (userId === post.expressions.happy[i].toString()) {
          post.expressions.happy.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the angry expression
      for (let i = 0; i < post.expressions.angry.length; i++) {
        if (userId === post.expressions.angry[i].toString()) {
          post.expressions.angry.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the disgust expression
      for (let i = 0; i < post.expressions.disgust.length; i++) {
        if (userId === post.expressions.disgust[i].toString()) {
          post.expressions.disgust.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the surprise expression
      for (let i = 0; i < post.expressions.surprise.length; i++) {
        if (userId === post.expressions.surprise[i].toString()) {
          post.expressions.surprise.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the fear expression
      for (let i = 0; i < post.expressions.fear.length; i++) {
        if (userId === post.expressions.fear[i].toString()) {
          post.expressions.fear.splice(i, 1);
          await post.save();

          found = true;
        }
        found = false;
      }
    } while (found);

    if (!found) {
      post.expressions[expression].push(userId);
      await post.save();
    }

    return res.status(200).json(post.expressions);
  }
);
