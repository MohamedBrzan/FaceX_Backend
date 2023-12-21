import User from '../models/User/User';

const DeleteUsersFromExpressions = async (
  expressions: any,
  property: string,
  modelId: string
): Promise<void> => {
  let keys = [
    'like',
    'love',
    'support',
    'sad',
    'happy',
    'angry',
    'disgust',
    'surprise',
    'fear',
  ];

  for (const name of keys) {
    for (let i = 0; i < expressions[name].length; i++) {
      console.log(expressions[name][i].toString());
      await User.findById(expressions[name][i].toString()).then(
        async (user) => {
          user[property].published.splice(
            user[property].published.indexOf(modelId),
            1
          );

          user[property].reacted.splice(
            user[property].reacted.indexOf(modelId),
            1
          );

          await user.save();
        }
      );
    }
  }
};

export default DeleteUsersFromExpressions;
