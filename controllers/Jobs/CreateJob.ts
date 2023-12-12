import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Job from '../../models/Job/Job';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let job = await Job.create({
      user: req['authorizedUser']._id,
      ...req.body,
    });

    let user = await User.findById(req['authorizedUser']._id);

    if (!user) {
      await Job.findByIdAndRemove(job['_id']);
      return next(
        new ErrorHandler(
          404,
          `User With Id ${req['authorizedUser']._id} Not Exist`
        )
      );
    }

    await User.findByIdAndUpdate(req['authorizedUser']._id, {
      $push: {
        jobs: job['_id'],
      },
    });

    return res.status(200).json(job);
  }
);
