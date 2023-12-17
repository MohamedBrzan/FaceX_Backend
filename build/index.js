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
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const debug_1 = __importDefault(require("debug"));
const DB_1 = __importDefault(require("./database/DB"));
const User_1 = __importDefault(require("./routes/User/User"));
const Post_1 = __importDefault(require("./routes/Post/Post"));
const Blog_1 = __importDefault(require("./routes/Blog/Blog"));
const Comment_1 = __importDefault(require("./routes/Comment/Comment"));
const Reply_1 = __importDefault(require("./routes/Comment/Reply/Reply"));
const Ad_1 = __importDefault(require("./routes/Ad/Ad"));
const HashTag_1 = __importDefault(require("./routes/HashTag/HashTag"));
const Image_1 = __importDefault(require("./routes/Image/Image"));
const Album_1 = __importDefault(require("./routes/Album/Album"));
const Notification_1 = __importDefault(require("./routes/Notification/Notification"));
const Reel_1 = __importDefault(require("./routes/Reel/Reel"));
const Payment_1 = __importDefault(require("./routes/Payment/Payment"));
const Video_1 = __importDefault(require("./routes/Video/Video"));
const ErrorMessage_1 = __importDefault(require("./middleware/ErrorMessage"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    done(null, profile);
})));
// passport.use(
//   new LocalStrategy({})
// );
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
}));
//* Setup passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//** Google Authentication ( passport-google-oauth20 ) */
const debugLogout = (0, debug_1.default)('GoogleLogout');
app.get('/', (req, res) => {
    res.send('Welcome to facex server side!');
});
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => res.redirect('/profile'));
const debugProfile = (0, debug_1.default)('GoogleProfile');
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>You're logged in </h1><pre>${JSON.stringify(req.user, null, 2)}</pre> `);
        debugProfile(req.user);
    }
    else {
        res.redirect('/');
    }
});
app.get('/logout', (req, res, next) => req.logout((err) => (err ? next(err) : res.redirect('/'))));
//** */
app.use('/user', User_1.default);
app.use('/ad', Ad_1.default);
app.use('/post', Post_1.default);
app.use('/blog', Blog_1.default);
app.use('/comment', Comment_1.default);
app.use('/reply', Reply_1.default);
app.use('/hashTag', HashTag_1.default);
app.use('/image', Image_1.default);
app.use('/album', Album_1.default);
app.use('/notification', Notification_1.default);
app.use('/reel', Reel_1.default);
app.use('/video', Video_1.default);
app.use('/payment', Payment_1.default);
app.use(ErrorMessage_1.default);
app.listen(3000, () => {
    debugServer(`listening on Port http://localhost:3000/`);
});
