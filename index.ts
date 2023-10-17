import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import DB from './database/DB';
import User from './routes/User/User';
import Post from './routes/Post/Post';
import Blog from './routes/Blog/Blog';
import Comment from './routes/Comment/Comment';
import Reply from './routes/Comment/Reply/Reply';
import Ad from './routes/Ad/Ad';
import HashTag from './routes/HashTag/HashTag';
import Image from './routes/Image/Image';
import Album from './routes/Album/Album';
import Notification from './routes/Notification/Notification';
import Reel from './routes/Reel/Reel';
import Payment from './routes/Payment/Payment';
import Video from './routes/Video/Video';
import ErrorMessage from './middleware/ErrorMessage';

dotenv.config({ path: './.env' });
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/user', User);
app.use('/ad', Ad);
app.use('/post', Post);
app.use('/blog', Blog);
app.use('/comment', Comment);
app.use('/reply', Reply);
app.use('/hashTag', HashTag);
app.use('/image', Image);
app.use('/album', Album);
app.use('/notification', Notification);
app.use('/reel', Reel);
app.use('/video', Video);
app.use('/payment', Payment);

DB();

app.use(ErrorMessage);

app.listen(3000, () => {
  console.log(`listening on Port http://localhost:3000/`);
});
