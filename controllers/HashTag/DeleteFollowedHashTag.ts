import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
<<<<<<< HEAD
    const { hashTagId } = req.body;
    const userId = (await getUserId(req)).toString();

    let hashTag = await HashTag.findById(hashTagId);

=======
    const { hashtagId } = req.body;
    let hashTag = await HashTag.findById(hashtagId);
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
    const { hashtagId } = req.body;
    let hashTag = await HashTag.findById(hashtagId);
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashtagId} Not Exist`)
      );

<<<<<<< HEAD
<<<<<<< HEAD
    if (hashTag.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This HashTag",
      });
=======
    const userId = (await getUserId(req)).toString();
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
    const userId = (await getUserId(req)).toString();
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037

    let user = await User.findById(userId);

    const hashTagIndex = user.hashTags.reacted.findIndex(
<<<<<<< HEAD
<<<<<<< HEAD
      (hashTag) => hashTag.toString() === hashTagId
=======
      (hashTag) => hashTag.toString() === hashtagId
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
      (hashTag) => hashTag.toString() === hashtagId
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    );

    if (hashTagIndex >= 0) {
      user.hashTags.reacted.splice(hashTagIndex, 1);
      await user.save();
      await HashTag.findByIdAndRemove(hashtagId);

      return res
        .status(200)
        .json({ success: true, msg: 'HashTag Deleted Successfully' });
    }
  }
);
