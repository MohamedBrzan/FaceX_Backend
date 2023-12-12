"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const debug_1 = __importDefault(require("debug"));
const DB_1 = __importDefault(require("./database/DB"));
const User_1 = __importDefault(require("./routes/User/User"));
const ErrorMessage_1 = __importDefault(require("./middleware/ErrorMessage"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
(0, DB_1.default)();
// export interface IGetUserAuthInfoRequest extends Request {
//   session: any;
//   isAuthenticated(): Function;
//   logout: any;
//   user: string; // or any other type
//   // isAuthenticated: Function;
//   // logout: Function;
// }
const debugServer = (0, debug_1.default)('app:sever');
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
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));
app.set('http://localhost:3000/', 1);
app.use((0, express_session_1.default)({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
}));
//* Setup passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
//** Google Authentication ( passport-google-oauth20 ) */
// const debugLogout = debug('GoogleLogout');
// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to facex server side!');
// });
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
app.use('/user', User_1.default);
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
app.use(ErrorMessage_1.default);
app.listen(3000, () => {
    debugServer(`listening on Port http://localhost:3000/`);
});
