import User from '../models/User/User';
import CheckAndRemove from './CheckAndRemove';
import ExpressionLoop from './ExpressionLoop';

export default async (
  targetModelSchema: any,
  modelName: any,
  property: string
): Promise<void> => {
  for (let target of modelName[property]) {
    const userOfTarget = await targetModelSchema
      .findById(target.toString())
      .select('user expressions');

    const users = ExpressionLoop(userOfTarget);

    for (const targetUser of users) {
      const user = await User.findById(targetUser).select(property);

      CheckAndRemove(user, 'replies', target);
      await user.save();
      await targetModelSchema.findByIdAndRemove(target.toString());
    }
  }
};
