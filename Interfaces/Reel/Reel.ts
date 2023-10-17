import Expressions from '../../Types/Post/Expressions';
import Comment from '../Comment/Comment';
import User from '../User/User';
import VisiblePrivacy from '../../enums/VisiblePrivacy';
import Image from '../Image/Image';
import Video from '../Video/Video';

interface Reel {
  user: User;
  title: string;
  image?: Image[];
  video?: Video[];
  expressions?: Expressions;
  comments: Comment[];
  visiblePrivacy: VisiblePrivacy;
}

export default Reel;
