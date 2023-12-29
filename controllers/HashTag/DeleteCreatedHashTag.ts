import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;
<<<<<<< HEAD
<<<<<<< HEAD

    const userId = (await getUserId(req)).toString();

    let hashTag = await HashTag.findById(hashtagId);

=======
    let hashTag = await HashTag.findById(hashtagId);
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
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

=======
    const userId = (await getUserId(req)).toString();

>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    if (hashTag.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This HashTag",
      });

<<<<<<< HEAD
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    let user = await User.findById(userId);

    const hashTagIndex = user.hashTags.published.findIndex(
      (hashTag) => hashTag.toString() === hashtagId
    );

    if (hashTagIndex >= 0) {
      user.hashTags.published.splice(hashTagIndex, 1);
      await user.save();
      await HashTag.findByIdAndRemove(hashtagId);
<<<<<<< HEAD
<<<<<<< HEAD

      return res
        .status(200)
        .json({ success: true, msg: 'HashTag Deleted Successfully' });
    }
=======
    }
    return res
      .status(200)
      .json({ success: true, msg: 'HashTag Deleted Successfully' });
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
    }
    return res
      .status(200)
      .json({ success: true, msg: 'HashTag Deleted Successfully' });
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
  }
);
