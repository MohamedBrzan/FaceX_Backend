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
const ErrorHandler_1 = __importDefault(require("../middleware/ErrorHandler"));
const FindModelInUser_1 = __importDefault(require("./FindModelInUser"));
exports.default = (res, next, userId, user, model, modelId, property, prevExpressionName, currentExpressionName) => __awaiter(void 0, void 0, void 0, function* () {
    let foundedInPrev = false;
    if (prevExpressionName && !model.expressions[prevExpressionName])
        return next(new ErrorHandler_1.default(404, 'prev expression string not found'));
    if (currentExpressionName && !model.expressions[currentExpressionName])
        return next(new ErrorHandler_1.default(404, 'current expression string not found'));
    if (prevExpressionName && currentExpressionName) {
        for (let i = 0; i < model.expressions[prevExpressionName].length; i++) {
            if (userId === model.expressions[prevExpressionName][i].toString()) {
                model.expressions[prevExpressionName].splice(i, 1);
                yield model.save();
                foundedInPrev = true;
            }
        }
    }
    if (prevExpressionName !== currentExpressionName && foundedInPrev === false)
        return next(new ErrorHandler_1.default(404, `something goes wrong. user not found in prevExpressionName`));
    if ((prevExpressionName && currentExpressionName && foundedInPrev === false) ||
        (prevExpressionName !== currentExpressionName && foundedInPrev === true)) {
        model.expressions[currentExpressionName].push(userId);
        yield model.save();
        yield (0, FindModelInUser_1.default)(user[property].published, user[property].reacted, user, userId, model, modelId, true);
    }
    else {
        yield (0, FindModelInUser_1.default)(user[property].published, user[property].reacted, user, userId, model, modelId, false);
    }
    return res.status(200).json(model.expressions);
});
