import User from '../User/User';
import Timing from '../../enums/Timing';
import Skill from '../Skill/Skill';

enum apply {
  easy = 'easy',
  apply = 'apply',
}

interface Job {
  user: User;
  title: string;
  apply: apply;
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
  skills: string[];
  about: {
    bio: string;
    duties: string;
    requirements: string;
    skills: {
      technical: Skill[];
      interpersonal: Skill[];
    };
  };
}

export default Job;
