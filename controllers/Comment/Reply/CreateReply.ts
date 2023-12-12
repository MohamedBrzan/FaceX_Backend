import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import User from '../../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref, message, visiblePrivacy } = req.body;

    let reply = await Reply.create({
      user: req['authorizedUser']._id,
      ref,
      reply: message,
      visiblePrivacy,
    });

    await User.findByIdAndUpdate(
      req['authorizedUser']._id,
      { $push: { replies: reply['_id'].toString() } },
      { runValidators: true, new: true }
    );

    return res.status(200).json(reply);
  }
);
