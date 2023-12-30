"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetPosts_1 = __importDefault(require("../../controllers/Post/GetPosts"));
const GetPost_1 = __importDefault(require("../../controllers/Post/GetPost"));
const CreatePost_1 = __importDefault(require("../../controllers/Post/CreatePost"));
const AddAndRemoveExpression_1 = __importDefault(require("../../controllers/Post/AddAndRemoveExpression"));
const UpdatePost_1 = __importDefault(require("../../controllers/Post/UpdatePost"));
const DeletePost_1 = __importDefault(require("../../controllers/Post/DeletePost"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const AddView_1 = __importDefault(require("../../controllers/Post/AddView"));
const DeleteView_1 = __importDefault(require("../../controllers/Post/DeleteView"));
const router = (0, express_1.Router)();
// Get Posts
router.get('/', GetPosts_1.default);
// Get Post
router.get('/:id', GetPost_1.default);
// Create Post
router.post('/create', IsAuthenticated_1.default, CreatePost_1.default);
// Add and Delete Expression for Posts
router.patch('/expressions/toggle', IsAuthenticated_1.default, AddAndRemoveExpression_1.default);
// Update Post
router.put('/update', IsAuthenticated_1.default, UpdatePost_1.default);
// Add Post View
router.patch('/views/add', IsAuthenticated_1.default, AddView_1.default);
// Delete Post View
router.patch('/views/del', IsAuthenticated_1.default, DeleteView_1.default);
// Delete Post
router.delete('/del', IsAuthenticated_1.default, DeletePost_1.default);
exports.default = router;
