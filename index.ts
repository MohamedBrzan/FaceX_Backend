import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import debug from 'debug';
import DB from './database/DB';
import User from './routes/User/User';
<<<<<<< HEAD
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
=======
import UserModel from './models/User/User';
// import Post from './routes/Post/Post';
// import Blog from './routes/Blog/Blog';
// import Comment from './routes/Comment/Comment';
// import Reply from './routes/Comment/Reply/Reply';
// import Ad from './routes/Ad/Ad';
// import HashTag from './routes/HashTag/HashTag';
// import Image from './routes/Image/Image';
// import Album from './routes/Album/Album';
// import Notification from './routes/Notification/Notification';
// import Reel from './routes/Reel/Reel';
// import Payment from './routes/Payment/Payment';
// import Video from './routes/Video/Video';
import ErrorMessage from './middleware/ErrorMessage';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
>>>>>>> auth
  })
);

DB();

const debugServer = debug('app:sever');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALL_BACK_URL,
//     },
//     async (
//       accessToken: any,
//       refreshToken: any,
//       profile: any,
//       done: (arg0: null, arg1: any) => void
//     ) => {
//       done(null, profile);
//     }
//   )
// );

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async function (
    req,
    username,
    password,
    done
  ) {
    const findUser = await UserModel.findOne({ email: username }).select(
      'email password'
    );
    if (!findUser) return done(null, false);
    return done(null, findUser);
  })
);

//* Setup the session middleware
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365.25 },
  })
);

//* Save User into session (cookie)
passport.serializeUser((user, done) => done(null, { email: user['email'] }));

//* Retrieve user from session (cookie)
passport.deserializeUser((email, done) => done(null, email));

app.use(passport.initialize());
app.use(passport.session());
// ;
//** Google Authentication ( passport-google-oauth20 ) */

// const debugLogout = debug('GoogleLogout');

app.get('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err)
      return res.status(401).json({
        message:
          'Access Denied. email or password is incorrect. please try again.',
      });
    if (!user) return res.status(401).json({ message: 'User Not Authorized' });
    return req.logIn(user, (err) => {
      if (err) return res.status(401).json({ error: err });
      return res.status(200).json(user);
    });
  })(req, res, next);
});

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile'] })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req: Request, res: Response) => res.redirect('/profile')
// );

// const debugProfile = debug('GoogleProfile');

// app.get('/profile', (req: Request, res: Response) => {
//   if (req.isAuthenticated()) {
//     res.send(
//       `<h1>You're logged in </h1><pre>${JSON.stringify(
//         req.user,
//         null,
//         2
//       )}</pre> `
//     );
//     debugProfile(req.user);
//   } else {
//     res.redirect('/');
//   }
// });

// app.get('/logout', (req: Request, res: Response, next: NextFunction) =>
//   req.logout((err) => (err ? next(err) : res.redirect('/')))
// );

//** */

app.use('/user', User);
<<<<<<< HEAD
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
=======
// app.use('/ad', Ad);
// app.use('/post', Post);
// app.use('/blog', Blog);
// app.use('/comment', Comment);
// app.use('/reply', Reply);
// app.use('/hashTag', HashTag);
// app.use('/image', Image);
// app.use('/album', Album);
// app.use('/notification', Notification);
// app.use('/reel', Reel);
// app.use('/video', Video);
// app.use('/payment', Payment);
>>>>>>> auth

app.use(ErrorMessage);

app.listen(3000, () => {
  debugServer(`listening on Port http://localhost:3000/`);
});
