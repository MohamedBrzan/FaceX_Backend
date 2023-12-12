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
const HashTag_1 = __importDefault(require("../../models/HashTag/HashTag"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let hashTag = yield HashTag_1.default.findById(id);
    if (!hashTag)
        return next(new ErrorHandler_1.default(404, `HashTag With Id ${id} Not Exist`));
    let user = yield User_1.default.findById(req['authorizedUser']._id);
    const hashTagIndex = user.hashTags.create.findIndex((hashTag) => hashTag['_id'].toString() === id);
    if (hashTagIndex >= 0) {
        user.hashTags.create.splice(hashTagIndex, 1);
        yield user.save();
        yield HashTag_1.default.findByIdAndRemove(id);
        return res
            .status(200)
            .json({ success: true, msg: 'HashTag Deleted Successfully' });
    }
    return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This HashTag",
    });
}));
