import Expressions from '../../Types/Post/Expressions';
import PostStatus from '../../enums/PostStatus';
import VisiblePrivacy from '../../enums/VisiblePrivacy';
import User from '../User/User';

interface Post {
  images?: string[];
  videos?: string[];
  title: string;
  content: string;
  status: PostStatus;
  user: User;
  views: User[];
  comments: Comment[];
  expressions: Expressions;
  shares: User[];
  saves: User[];
  visiblePrivacy: VisiblePrivacy;
}

export default Post;
