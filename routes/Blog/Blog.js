"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetBlogs_1 = __importDefault(require("../../controllers/Blog/GetBlogs"));
const GetBlog_1 = __importDefault(require("../../controllers/Blog/GetBlog"));
const UpdateBlog_1 = __importDefault(require("../../controllers/Blog/UpdateBlog"));
const DeleteBlog_1 = __importDefault(require("../../controllers/Blog/DeleteBlog"));
const CreateBlog_1 = __importDefault(require("../../controllers/Blog/CreateBlog"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Blogs
router.get('/', GetBlogs_1.default);
// Get Blog
router.get('/:id', GetBlog_1.default);
// Post Blog
router.post('/', IsAuthenticated_1.default, CreateBlog_1.default);
// Put Blog
router.put('/:id', IsAuthenticated_1.default, UpdateBlog_1.default);
// Delete Blog
router.delete('/:id', IsAuthenticated_1.default, DeleteBlog_1.default);
exports.default = router;
