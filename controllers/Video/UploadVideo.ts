import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { video, ref } = req.body;

    let vdeo = await Video.create({ user: req['authorizedUser']._id, video, ref });

    let user = await User.findById(req['authorizedUser']._id);

    if (!user) {
      await Video.findByIdAndRemove(vdeo['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['authorizedUser']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['authorizedUser']._id, {
      $push: {
        videos: vdeo['_id'],
      },
    });

    return res.status(200).json(vdeo);
  }
);
