import Reply from '../models/Comment/Reply';
import User from '../models/User/User';

export default async (
  commentModel: any,
  parentModel: any,
  comments: string,
  replies: string
) => {
  for (const commentId of parentModel[comments]) {
    const comment = await commentModel.findById(commentId);

    Object.keys(comment.expressions).forEach((key) => {
      comment.expressions[key].forEach(async (id) => {
        await User.findByIdAndUpdate(
          id,
          { $pull: { [`${comments}.reacted`]: commentId } },
          { runValidators: true, new: true, upsert: true }
        );
      });
    });

    for (const replyId of comment[replies]) {
      const reply = await Reply.findById(replyId);
      Object.keys(reply.expressions).forEach((key) => {
        reply.expressions[key].forEach(async (id) => {
          await User.findByIdAndUpdate(
            id,
            { $pull: { [`${replies}.reacted`]: replyId } },
            { runValidators: true, new: true, upsert: true }
          );
        });
      });
      await User.findByIdAndUpdate(
        reply.user.toString(),
        { $pull: { [`${replies}.published`]: replyId } },
        { runValidators: true, new: true, upsert: true }
      );
    }

    parentModel[comments].splice(parentModel[comments].indexOf(commentId), 1);
    await parentModel.save();

    await User.findByIdAndUpdate(comment.user.toString(), {
      $pull: { [`${comments}.published`]: commentId },
    });

    await commentModel.findByIdAndRemove(commentId);
  }
};
