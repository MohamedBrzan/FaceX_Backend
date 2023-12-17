import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { following } = req.body;

    let user = await User.findById(req.user['id']).select(
      'followings name _id'
    );

    if (following === user._id.toString())
      return next(new ErrorHandler(500, 'You Cannot Follow Yourself'));

    let follower = await User.findById(following).select('followers name');

    const userIndex = follower?.followers?.findIndex(
      (f) => f.toString() === req.user['id']
    );

    if (follower?.followers?.length > 0 && userIndex)
      return next(
        new ErrorHandler(500, `${follower.name} Is Already In Your Followings`)
      );

    let followingIndex = user?.followings?.findIndex(
      (f) => f.toString() === following
    );

    if (user?.followings?.length > 0 && followingIndex)
      return next(
        new ErrorHandler(500, `${following?.name} Is Already In Your Followers`)
      );

    //* Following The User
    follower.followers.push(req.user['id']);
    await follower.save();

    //* Follow The User
    user.followings.push(following);
    await user.save();

    return res.status(200).json({
      message: `You (${user?.name}) Follow ${follower?.name} Successfully`,
    });
  }
);
