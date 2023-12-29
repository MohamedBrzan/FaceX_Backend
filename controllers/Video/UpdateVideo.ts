import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { videoId } = req.body;

    let video = await Video.findById(videoId);

    if (!video)
      return next(new ErrorHandler(404, `Video With Id ${videoId} Not Exist`));

    video = await Video.findByIdAndUpdate(videoId, req.body, {
      runValidators: true,
      new: true,
<<<<<<< HEAD
<<<<<<< HEAD
      upsert: true,
=======
      upsert:true
>>>>>>> 1d8bc49 (fix all functions in controllers/Video)
=======
      upsert:true
>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    });

    return res.status(200).json(video);
  }
);
