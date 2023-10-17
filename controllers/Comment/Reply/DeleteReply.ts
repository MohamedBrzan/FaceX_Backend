import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import ErrorHandler from '../../../middleware/ErrorHandler';
import User from '../../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.body;

    let reply = await Reply.findById(replyId);

    if (!reply)
      return next(new ErrorHandler(404, `This Reply Id ${replyId} Not Found`));

    reply = await Reply.findByIdAndRemove(replyId);

    await User.findByIdAndUpdate(
      req['user']._id,
      { $pull: { replies: replyId } },
      { runValidators: true, new: true }
    );

    return res.status(200).json({ message: 'Reply Deleted Successfully' });
  }
);
