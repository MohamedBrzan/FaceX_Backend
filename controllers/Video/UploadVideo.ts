import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import User from '../../models/User/User';
<<<<<<< HEAD
import ErrorHandler from '../../middleware/ErrorHandler';
=======
>>>>>>> 1d8bc49 (fix all functions in controllers/Video)
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { video, ref } = req.body;

    const userId = (await getUserId(req)).toString();

    let newVideo = await Video.create({ user: userId, video, ref });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
<<<<<<< HEAD
          'videos.published': newVideo,
=======
          'videos.published': newVideo._id,
>>>>>>> 1d8bc49 (fix all functions in controllers/Video)
        },
      },
      { new: true, runValidators: true, upsert: true }
    );

<<<<<<< HEAD
    return res.status(200).json(newVideo);
=======
    return res.status(200).json({ video: newVideo });
>>>>>>> 1d8bc49 (fix all functions in controllers/Video)
  }
);
