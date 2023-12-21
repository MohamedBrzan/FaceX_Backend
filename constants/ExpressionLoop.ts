export default async (userId: string, modelName: any): Promise<boolean> => {
  try {
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

    let founded: boolean = false;

    for (const name of keys) {
      do {
        for (let i = 0; i < modelName.expressions[name].length; i++) {
          if (userId === modelName.expressions[name][i].toString()) {
            modelName.expressions[name].splice(i, 1);
            await modelName.save();
            founded = true;
          }
        }
      } while (false);
    }

    return founded;
  } catch (error) {
    throw new Error(error);
  }
};
