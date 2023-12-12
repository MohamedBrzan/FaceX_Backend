import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Job from '../../models/Job/Job';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job)
      return next(new ErrorHandler(404, `Couldn't Find Job With Id => ${id}`));

    let user = await User.findById(req['authorizedUser']._id);

    const jobIndex = user.jobs.findIndex((job) => job['_id'].toString() === id);

    if (jobIndex >= 0) {
      user.jobs.splice(jobIndex, 1);
      await user.save();
      await Job.findByIdAndRemove(id);
      return res
        .status(200)
        .json({ success: true, msg: 'Job Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message:
        "Sorry!!, You're Not The Owner Of This Job or it's already deleted",
    });
  }
);
