import UserInterface from '../Interfaces/User/User';
import Job from '../models/Job/Job';
import User from '../models/User/User';

export default async (
  userId: string,
  user: UserInterface,
  property: string
) => {
  for (const jobId of user.jobs[property]) {
    const job = await Job.findById(jobId);
    if (property === 'published') {
      console.log('ys');
      Object.keys(job.process).forEach((key) => {
        job.process[key].forEach(async (data, index) => {
          console.log('job.process[key]', job.process[key]);
          console.log('data=>', data);
          //! Delete the job from user
          await User.findByIdAndUpdate(data.user.toString(), {
            $pull: { [`jobs.${key}`]: jobId },
          });
          //! Delete the user from the job
          job.process[key].splice(index, 1);
          await job.save();
        });
      });
      await Job.findByIdAndDelete(jobId);
    } else {
      console.log('no');
      Object.keys(job.process).forEach((key) => {
        job.process[key].forEach(async (data, index) => {
          console.log('data=>', data);
          if (data.user.toString() === userId) {
            job.process[key].splice(index, 1);
            await job.save();
          }
        });
      });
    }
  }
  return true;
};
