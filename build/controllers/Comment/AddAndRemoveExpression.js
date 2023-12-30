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
const AsyncHandler_1 = __importDefault(require("../../middleware/AsyncHandler"));
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
const User_1 = __importDefault(require("../../models/User/User"));
const UserId_1 = require("../../constants/UserId");
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const ToggleExpression_1 = __importDefault(require("../../constants/ToggleExpression"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { prevExpressionName, currentExpressionName, commentId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findById(userId);
    let comment = yield Comment_1.default.findById(commentId);
    if (!comment)
        return next(new ErrorHandler_1.default(404, 'this comment not exists'));
    yield (0, ToggleExpression_1.default)(res, next, userId, user, comment, commentId, 'comments', prevExpressionName, currentExpressionName);
}));
