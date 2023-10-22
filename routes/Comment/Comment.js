"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetComments_1 = __importDefault(require("../../controllers/Comment/GetComments"));
const CreateComment_1 = __importDefault(require("../../controllers/Comment/CreateComment"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const DeleteComment_1 = __importDefault(require("../../controllers/Comment/DeleteComment"));
const UpdateComment_1 = __importDefault(require("../../controllers/Comment/UpdateComment"));
const GetComment_1 = __importDefault(require("../../controllers/Comment/GetComment"));
const router = (0, express_1.Router)();
// Get Comments
router.get('/', GetComments_1.default);
// Get Comment
router.get('/:id', GetComment_1.default);
// Post Comment
router.post('/', IsAuthenticated_1.default, CreateComment_1.default);
// Put Comment
router.put('/:id', IsAuthenticated_1.default, UpdateComment_1.default);
// Delete Comment
router.delete('/', IsAuthenticated_1.default, DeleteComment_1.default);
exports.default = router;
