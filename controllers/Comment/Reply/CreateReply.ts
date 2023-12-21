import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import User from '../../../models/User/User';
import { getUserId } from '../../../constants/UserId';
import Comment from '../../../models/Comment/Comment';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref, message, visiblePrivacy } = req.body;

    const userId = (await getUserId(req)).toString();

    let reply = await Reply.create({
      user: userId,
      ref,
      reply: message,
      visiblePrivacy,
    });

    await Comment.findByIdAndUpdate(
      ref,
      { $push: { replies: reply._id } },
      { runValidators: true, new: true, upsert: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $push: { 'replies.published': reply._id.toString() } },
      { runValidators: true, new: true, upsert: true }
    );

    return res.status(200).json(reply);
  }
);
