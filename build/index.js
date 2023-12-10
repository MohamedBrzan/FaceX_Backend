"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
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
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
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
(0, DB_1.default)();
app.use(ErrorMessage_1.default);
app.listen(3000, () => {
    console.log(`listening on Port http://localhost:3000/`);
});