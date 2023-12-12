import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import debug from 'debug';
import DB from './database/DB';
import User from './routes/User/User';
import Post from './routes/Post/Post';
import Blog from './routes/Blog/Blog';
import Job from './routes/Job/Job';
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
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

DB();

const debugServer = debug('app:sever');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    },
    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => void
    ) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.set('http://localhost:3000/', 1);

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

//* Setup passport middleware
app.use(passport.initialize());
app.use(passport.session());

//** Google Authentication ( passport-google-oauth20 ) */

const debugLogout = debug('GoogleLogout');

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to facex server side!');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => res.redirect('/profile')
);

const debugProfile = debug('GoogleProfile');

app.get('/profile', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.send(
      `<h1>You're logged in </h1><pre>${JSON.stringify(
        req.user,
        null,
        2
      )}</pre> `
    );
    debugProfile(req.user);
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req: Request, res: Response, next: NextFunction) =>
  req.logout((err) => (err ? next(err) : res.redirect('/')))
);

//** */

app.use('/user', User);
app.use('/ad', Ad);
app.use('/post', Post);
app.use('/blog', Blog);
app.use('/job', Job);
app.use('/comment', Comment);
app.use('/reply', Reply);
app.use('/hashTag', HashTag);
app.use('/image', Image);
app.use('/album', Album);
app.use('/notification', Notification);
app.use('/reel', Reel);
app.use('/video', Video);
app.use('/payment', Payment);

app.use(ErrorMessage);

app.listen(3000, () => {
  debugServer(`listening on Port http://localhost:3000/`);
});
