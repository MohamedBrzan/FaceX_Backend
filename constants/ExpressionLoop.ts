export default (modelName: any) => {
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

  let users = new Set();

  keys.forEach((key) => {
    for (let i = 0; i < modelName.expressions[key].length; i++) {
      users.add(modelName.expressions[key][i]);
    }
  });

  return users;
};
