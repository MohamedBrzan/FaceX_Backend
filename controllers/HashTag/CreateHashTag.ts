import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;

    const userId = (await getUserId(req)).toString();

    let hashTag = await HashTag.create({ user: userId, text });

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
