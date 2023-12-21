export default async (
  publishedTrack: any[],
  reactedTrack: any[],
  user: { save: () => any },
  userId: string,
  modelToFind: { user: { toString: () => string } },
  modelId: any
): Promise<void> => {
  try {
    const inPublished = publishedTrack.findIndex(
      (p: { toString: () => any }) => p.toString() === modelId
    );

    const inReacted = reactedTrack.findIndex(
      (p: { toString: () => any }) => p.toString() === modelId
    );

    if (
      inReacted === -1 &&
      inPublished === -1 &&
      modelToFind.user.toString() !== userId
    ) {
      reactedTrack.push(modelId);
      await user.save();
    }
  } catch (error) {
    throw new Error(error);
  }
};
