import { Document } from 'mongoose';

export default async (userId: string, modelName: any) => {
  try {
    do {
      // TODO // Search for userId in the like expression
      for (let i = 0; i < modelName.expressions.like.length; i++) {
        if (userId === modelName.expressions.like[i].toString()) {
          modelName.expressions.like.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the love expression
      for (let i = 0; i < modelName.expressions.love.length; i++) {
        if (userId === modelName.expressions.love[i].toString()) {
          modelName.expressions.love.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the support expression
      for (let i = 0; i < modelName.expressions.support.length; i++) {
        if (userId === modelName.expressions.support[i].toString()) {
          modelName.expressions.support.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the sad expression
      for (let i = 0; i < modelName.expressions.sad.length; i++) {
        if (userId === modelName.expressions.sad[i].toString()) {
          modelName.expressions.sad.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the happy expression
      for (let i = 0; i < modelName.expressions.happy.length; i++) {
        if (userId === modelName.expressions.happy[i].toString()) {
          modelName.expressions.happy.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the angry expression
      for (let i = 0; i < modelName.expressions.angry.length; i++) {
        if (userId === modelName.expressions.angry[i].toString()) {
          modelName.expressions.angry.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the disgust expression
      for (let i = 0; i < modelName.expressions.disgust.length; i++) {
        if (userId === modelName.expressions.disgust[i].toString()) {
          modelName.expressions.disgust.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the surprise expression
      for (let i = 0; i < modelName.expressions.surprise.length; i++) {
        if (userId === modelName.expressions.surprise[i].toString()) {
          modelName.expressions.surprise.splice(i, 1);
          await modelName.save();
        }
      }

      // TODO // Search for userId in the fear expression
      for (let i = 0; i < modelName.expressions.fear.length; i++) {
        if (userId === modelName.expressions.fear[i].toString()) {
          modelName.expressions.fear.splice(i, 1);
          await modelName.save();
        }
      }
    } while (false);
  } catch (error) {
    throw new Error(error);
  }
};
