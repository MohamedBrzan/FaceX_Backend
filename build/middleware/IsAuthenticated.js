"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler_1 = __importDefault(require("./AsyncHandler"));
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
// export default AsyncHandler(
// async (req: Request, res: Response, next: NextFunction) => {
// console.log(req.user)
// const { token } = req.cookies;
// if (!token) return next(new ErrorHandler(404, 'Not Authorized'));
// const decoded = jwt.decode(token, process.env.JWT_SECRET_TOKEN);
// req['user'] = await User.findById(decoded.id);
// next();
// }
// );
exports.default = (0, AsyncHandler_1.default)((req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new ErrorHandler_1.default(404, "You're not Authenticated"));
    }
    next();
});
