"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const debug_1 = __importDefault(require("debug"));
const DB_1 = __importDefault(require("./database/DB"));
const User_1 = __importDefault(require("./models/User/User"));
const User_2 = __importDefault(require("./routes/User/User"));
const Post_1 = __importDefault(require("./routes/Post/Post"));
const Blog_1 = __importDefault(require("./routes/Blog/Blog"));
const Job_1 = __importDefault(require("./routes/Job/Job"));
const Comment_1 = __importDefault(require("./routes/Comment/Comment"));
const Reply_1 = __importDefault(require("./routes/Comment/Reply/Reply"));
const HashTag_1 = __importDefault(require("./routes/HashTag/HashTag"));
const Image_1 = __importDefault(require("./routes/Image/Image"));
const Album_1 = __importDefault(require("./routes/Album/Album"));
const Reel_1 = __importDefault(require("./routes/Reel/Reel"));
const Video_1 = __importDefault(require("./routes/Video/Video"));
const ErrorMessage_1 = __importDefault(require("./middleware/ErrorMessage"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    credentials: true,
}));
(0, DB_1.default)();
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
// app.set('http://localhost:3000/', 1);
passport_1.default.use(new passport_local_1.Strategy({ passReqToCallback: true }, function (req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield User_1.default.findOne({ email: username }).select('email password');
        if (!findUser)
            return done(null, false);
        return done(null, {
            id: findUser._id,
            email: findUser.email,
            password: findUser.password,
        });
    });
}));
//* Setup the session middleware
app.use((0, express_session_1.default)({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365.25 },
}));
//* Save User into session (cookie)
passport_1.default.serializeUser((user, done) => {
    if (user['_id']) {
        return done(null, { id: user['_id'] });
    }
    return done(null, { id: user['id'] });
});
//* Retrieve user from session (cookie)
passport_1.default.deserializeUser((id, done) => done(null, id));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// ;
//** Google Authentication ( passport-google-oauth20 ) */
// const debugLogout = debug('GoogleLogout');
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
app.use('/user', User_2.default);
app.use('/post', Post_1.default);
app.use('/comment', Comment_1.default);
app.use('/reply', Reply_1.default);
app.use('/reel', Reel_1.default);
app.use('/blog', Blog_1.default);
app.use('/job', Job_1.default);
app.use('/hashTag', HashTag_1.default);
// app.use('/ad', Ad);
app.use('/hashTag', HashTag_1.default);
app.use('/image', Image_1.default);
app.use('/album', Album_1.default);
// app.use('/notification', Notification);
app.use('/video', Video_1.default);
// app.use('/payment', Payment);
app.use(ErrorMessage_1.default);
app.listen(3000, () => {
    debugServer(`listening on Port http://localhost:3000/`);
});
