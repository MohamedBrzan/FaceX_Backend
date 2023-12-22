import User from '../models/User/User';
// import CheckAndRemove from './CheckAndRemove';
import ExpressionLoop from './ExpressionLoop';

export default async (
  targetModelSchema: any,
  modelName: any,
  property: string
): Promise<void> => {
  for (let target of modelName[property]) {
    const model = await targetModelSchema
      .findById(target.toString())
      .select('user expressions');

    const userOfModel = await User.findById(model.user.toString());

    const users = ExpressionLoop(model);

    for (const targetUser of users) {
      const user = await User.findById(targetUser).select(property);

      //! Delete the model from user[modelContainer].reacted
      user[property].reacted.splice(user[property].reacted.indexOf(target), 1);
      await user.save();
    }

    //! Delete the owner of the model
    userOfModel[property].published.splice(
      userOfModel[property].published.indexOf(model),
      1
    );
    await userOfModel.save();

    //! Delete the model from DB
    await targetModelSchema.findByIdAndRemove(target.toString());
  }
};
