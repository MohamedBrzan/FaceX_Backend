import Reply from '../models/Comment/Reply';
import User from '../models/User/User';

const DeleteUsersFromModelTest = async (
  targetModel: any,
  parentModel: any,
  property: string
) => {
  for (const targetId of parentModel[property]) {
    console.log(targetId);
    const target = await targetModel.findById(targetId);

    Object.keys(target.expressions).forEach((key) => {
      target.expressions[key].forEach(async (id) => {
        await User.findByIdAndUpdate(
          id,
          { $pull: { [`${property}.reacted`]: targetId } },
          { runValidators: true, new: true, upsert: true }
        );
      });
    });

    for (const replyId of target['replies']) {
      const reply = await Reply.findById(replyId);
      Object.keys(reply.expressions).forEach((key) => {
        reply.expressions[key].forEach(async (id) => {
          await User.findByIdAndUpdate(
            id,
            { $pull: { [`replies.reacted`]: replyId } },
            { runValidators: true, new: true, upsert: true }
          );
        });
      });
      await User.findByIdAndUpdate(
        reply.user.toString(),
        { $pull: { [`replies.published`]: replyId } },
        { runValidators: true, new: true, upsert: true }
      );
    }

    parentModel[property].splice(parentModel[property].indexOf(targetId), 1);
    await parentModel.save();

    await User.findByIdAndUpdate(target.user.toString(), {
      $pull: { [`${property}.published`]: targetId },
    });

    await targetModel.findByIdAndRemove(targetId);
  }
};

export default DeleteUsersFromModelTest;
