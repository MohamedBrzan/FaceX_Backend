import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;

    const userId = (await getUserId(req)).toString();
<<<<<<< HEAD
<<<<<<< HEAD

    let user = await User.findById(userId);
=======
>>>>>>> 16242ca (fix all hashTag controllers functions)

    let hashTag = await HashTag.create({ user: userId, text });

<<<<<<< HEAD
    let hashTag = await HashTag.create({
      user: userId,
      text,
=======
=======

    let hashTag = await HashTag.create({ user: userId, text });

>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    await User.findByIdAndUpdate(userId, {
      $push: {
        'hashTags.create': hashTag.toString(),
      },
>>>>>>> 16242ca (fix all hashTag controllers functions)
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          'hashTags.published': hashTag.toString(),
        },
      },
      { new: true, runValidators: true, upsert: true }
    );

    return res.status(200).json(hashTag);
  }
);
