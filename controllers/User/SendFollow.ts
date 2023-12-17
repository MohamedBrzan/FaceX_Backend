import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { following } = req.body;

<<<<<<< HEAD
    let user = await User.findById(req['authorizedUser']._id).select(
=======
    let user = await User.findById(req.user['id']).select(
>>>>>>> auth
      'followings name _id'
    );
<<<<<<< HEAD
=======
    // let user = await User.findById(req['user']._id).select(
    //   'followings name _id'
    // );
>>>>>>> auth
=======
>>>>>>> main

    if (following === user._id.toString())
      return next(new ErrorHandler(500, 'You Cannot Follow Yourself'));

    let follower = await User.findById(following).select('followers name');

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
    const userIndex = follower?.followers?.findIndex(
<<<<<<< HEAD
      (f) => f.toString() === req['authorizedUser']._id
=======
      (f) => f.toString() === req.user['id']
>>>>>>> auth
    );
<<<<<<< HEAD
=======
    // const userIndex = follower?.followers?.findIndex(
    //   (f) => f.toString() === req['user']._id
    // );
>>>>>>> auth
=======
>>>>>>> main

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
    //* Following The User
<<<<<<< HEAD
    follower.followers.push(req['authorizedUser']._id);
=======
    follower.followers.push(req.user['id']);
>>>>>>> auth
    await follower.save();
<<<<<<< HEAD
=======
    // //* Following The User
    // follower.followers.push(req['user']._id);
    // await follower.save();
>>>>>>> auth
=======
>>>>>>> main

    //* Follow The User
    user.followings.push(following);
    await user.save();

    return res.status(200).json({
      message: `You (${user?.name}) Follow ${follower?.name} Successfully`,
    });
  }
);
