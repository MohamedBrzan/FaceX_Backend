import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashTagId } = req.body;
    let hashTag = await HashTag.findById(hashTagId);
    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashTagId} Not Exist`)
      );

    let user = await User.findById(req['user']._id);

    const hashTagIndex = user.hashTags.follow.findIndex(
      (hashTag) => hashTag['_id'].toString() === hashTagId
    );

    if (hashTagIndex >= 0) {
      user.hashTags.follow.splice(hashTagIndex, 1);
      await user.save();
      await HashTag.findByIdAndRemove(hashTagId);

      return res
        .status(200)
        .json({ success: true, msg: 'HashTag Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This HashTag",
    });
  }
);
