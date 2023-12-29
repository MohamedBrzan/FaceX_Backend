import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;
    let hashTag = await HashTag.findById(hashtagId);
    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashtagId} Not Exist`)
      );

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    const hashTagIndex = user.hashTags.reacted.findIndex(
      (hashTag) => hashTag.toString() === hashtagId
    );

    if (hashTagIndex >= 0) {
      user.hashTags.reacted.splice(hashTagIndex, 1);
      await user.save();
      await HashTag.findByIdAndRemove(hashtagId);

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
