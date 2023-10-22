"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetPosts_1 = __importDefault(require("../../controllers/Post/GetPosts"));
const GetPost_1 = __importDefault(require("../../controllers/Post/GetPost"));
const UpdatePost_1 = __importDefault(require("../../controllers/Post/UpdatePost"));
const DeletePost_1 = __importDefault(require("../../controllers/Post/DeletePost"));
const CreatePost_1 = __importDefault(require("../../controllers/Post/CreatePost"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Posts
router.get('/', GetPosts_1.default);
// Get Post
router.get('/:id', GetPost_1.default);
// Post Post
router.post('/', IsAuthenticated_1.default, CreatePost_1.default);
// Put Post
router.put('/:id', IsAuthenticated_1.default, UpdatePost_1.default);
// Delete Post
router.delete('/:id', IsAuthenticated_1.default, DeletePost_1.default);
exports.default = router;
