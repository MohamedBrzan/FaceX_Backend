import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    let reel = await Reel.create({ user: req['user']._id, title });

    let user = await User.findById(req['user']._id);

    if (!user) {
      await Reel.findByIdAndRemove(reel['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['user']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['user']._id, {
      $push: {
        reels: reel['_id'],
      },
    });

    return res.status(200).json(reel);

    //*** */
  }
);
