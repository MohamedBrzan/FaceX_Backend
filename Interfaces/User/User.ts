import Ad from '../Ad/Ad';
import Album from '../Album/Album';
import Blog from '../Blog/Blog';
import Comment from '../Comment/Comment';
import Reply from '../Comment/Reply';
import HashTag from '../HashTag/HashTag';
import Notification from '../Notification/Notification';
import Payment from '../Payment/Payment';
import Post from '../Post/Post';
import Reel from '../Reel/Reel';
import Video from '../Video/Video';

interface User {
  name: string;
  email: string;
  password: string;
  images?: string[];
  albums?: Album[];
  videos?: Video[];
  payments?: Payment[];
  hashTags?: { create: HashTag[]; follow: HashTag[] };
  comments?: Comment[];
  replies?: Reply[];
  avatar?: string;
  cover?: string;
  bio?: string;
  gender?: string;
  role: string;
  followers?: User[];
  followings?: User[];
  posts?: Post[];
  blogs?: Blog[];
  isVerified?: boolean;
  ads?: Ad[];
  reels?: Reel[];
  notifications?: Notification[];
  saved?: [];
  location?: string;
  website?: string;
  github?: string;
  deletion?: Date;
  isDeleted: boolean;
}

export default User;
