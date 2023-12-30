import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { videoId } = req.body;

    const userId = (await getUserId(req)).toString();

    let video = await Video.findById(videoId);

    if (!video)
      return next(new ErrorHandler(404, `Video With Id ${videoId} Not Exist`));

    if (video.user.toString() !== userId)
      return res.status(404).json({
        success: false,
        message: "Sorry!!, you're not allow to delete this video",
      });

    await User.findByIdAndUpdate(
      userId,
      { $pull: { 'videos.published': videoId } },
      { new: true, runValidators: true, upsert: true }
    );

    await Video.findByIdAndRemove(videoId);

    return res.status(200).json({
      success: true,
      message: 'Video Deleted Successfully',
    });
  }
);
