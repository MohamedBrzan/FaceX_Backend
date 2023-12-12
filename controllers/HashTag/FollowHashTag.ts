import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashTagId } = req.body;

    let hashTag = await HashTag.findById(hashTagId).select('followers');

    if (!hashTag)
      return next(
        new ErrorHandler(404, `Cannot Find HashTag With Id : ${hashTagId}`)
      );

    let user = await User.findById(req['authorizedUser']._id).select('hashTags');

    const findHashTagOwner = user?.hashTags?.create?.findIndex(
      (tag) => tag === hashTag
    );

    if (findHashTagOwner > -1)
      return next(new ErrorHandler(500, `You Cannot Follow Your HashTag`));

    const findUser = hashTag?.followers?.findIndex(
      (user) => user.toString() === req['authorizedUser']._id.toString()
    );

    if (findUser > -1)
      return next(new ErrorHandler(500, `You Already Following This HashTag`));

    hashTag.followers.push(req['authorizedUser']._id.toString());
    await hashTag.save();

    user.hashTags.follow.push(hashTagId);
    await user.save();

    return res.status(200).json({ message: 'You Follow HashTag Successfully' });
  }
);
