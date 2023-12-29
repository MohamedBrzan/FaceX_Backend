import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashTagId } = req.body;

    const userId = (await getUserId(req)).toString();

    let hashTag = await HashTag.findById(hashTagId).select('followers');

    if (!hashTag)
      return next(
        new ErrorHandler(404, `Cannot Find HashTag With Id : ${hashTagId}`)
      );

    let user = await User.findById(userId).select('hashTags');

<<<<<<< HEAD
<<<<<<< HEAD
    const findHashTagOwner = user.hashTags.published.findIndex(
      (tag) => tag === hashTag
=======
    const findHashTagOwner = user.hashTags.reacted.findIndex(
      (tag) => tag.toString() === hashTagId
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
    const findHashTagOwner = user.hashTags.reacted.findIndex(
      (tag) => tag.toString() === hashTagId
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    );

    if (findHashTagOwner > -1)
      return next(new ErrorHandler(500, `You Cannot Follow Your HashTag`));

<<<<<<< HEAD
<<<<<<< HEAD
    const findUser = hashTag?.followers?.findIndex(
=======
    const findUser = hashTag.followers.findIndex(
>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
    const findUser = hashTag.followers.findIndex(
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
      (user) => user.toString() === userId
    );

    if (findUser > -1)
      return next(new ErrorHandler(500, `You Already Following This HashTag`));

    hashTag.followers.push(userId);
    await hashTag.save();

    user.hashTags.reacted.push(hashTagId);
    await user.save();

    return res.status(200).json({ message: 'You Follow HashTag Successfully' });
  }
);
