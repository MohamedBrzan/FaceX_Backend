import User from '../User/User';
import Timing from '../../enums/Timing';

interface Job {
  user: User;
  title: string;
  type: {
    position: string;
    timing: Timing;
  };
  company: {
    name: string;
    address: string;
    employees?: {
      count: {
        from: number;
        to: number;
      };
    };
    applicants?: number;
  };
}

export default Job;
