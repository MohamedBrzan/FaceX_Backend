import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Comment from '../../models/Comment/Comment';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let reel = await Reel.findById(id);
    if (!reel)
      return next(new ErrorHandler(404, `Reel With Id ${id} Not Exist`));

    let user = await User.findById(req['authorizedUser']._id);

    const reelIndex = user.reels.findIndex(
      (reel) => reel['_id'].toString() === id
    );

    if (reelIndex >= 0) {
      user.reels.splice(reelIndex, 1);
      await user.save();
      //* Delete All Reel Comments
      for (let i = 0; i < reel.comments.length; i++) {
        await Comment.findByIdAndRemove(reel.comments[i].toString());
      }
      await Reel.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Reel Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Reel",
    });
  }
);
