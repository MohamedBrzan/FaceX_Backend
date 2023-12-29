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
    const findHashTagOwner = user.hashTags.published.findIndex(
      (tag) => tag === hashTag
=======
    const findHashTagOwner = user.hashTags.reacted.findIndex(
      (tag) => tag.toString() === hashTagId
>>>>>>> 16242ca (fix all hashTag controllers functions)
    );

    if (findHashTagOwner > -1)
      return next(new ErrorHandler(500, `You Cannot Follow Your HashTag`));

<<<<<<< HEAD
    const findUser = hashTag?.followers?.findIndex(
=======
    const findUser = hashTag.followers.findIndex(
>>>>>>> 16242ca (fix all hashTag controllers functions)
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
