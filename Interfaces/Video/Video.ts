import Album from '../Album/Album';
import User from '../User/User';

interface Video {
  user: User;
  video: Video;
  ref: Album;
}

export default Video;
