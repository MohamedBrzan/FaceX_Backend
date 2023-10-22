"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetUsers_1 = __importDefault(require("../../controllers/User/GetUsers"));
const Register_1 = __importDefault(require("../../controllers/User/Register"));
const Login_1 = __importDefault(require("../../controllers/User/Login"));
const GetUser_1 = __importDefault(require("../../controllers/User/GetUser"));
const UpdateUser_1 = __importDefault(require("../../controllers/User/UpdateUser"));
const DeleteUser_1 = __importDefault(require("../../controllers/User/DeleteUser"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const GetMyProfile_1 = __importDefault(require("../../controllers/User/GetMyProfile"));
const ReceiveFollow_1 = __importDefault(require("../../controllers/User/ReceiveFollow"));
const SendFollow_1 = __importDefault(require("../../controllers/User/SendFollow"));
const router = (0, express_1.Router)();
// Get Users
router.get('/', GetUsers_1.default);
// Register User
router.post('/register', Register_1.default);
// Login User
router.get('/login', Login_1.default);
// User Profile
router.get('/me', IsAuthenticated_1.default, GetMyProfile_1.default);
// Follower
router.post('/follower', IsAuthenticated_1.default, ReceiveFollow_1.default);
// Following
router.post('/following', IsAuthenticated_1.default, SendFollow_1.default);
// Get User
router.get('/:id', GetUser_1.default);
// Put User
router.put('/:id', IsAuthenticated_1.default, UpdateUser_1.default);
// Delete User
router.delete('/:id', IsAuthenticated_1.default, DeleteUser_1.default);
exports.default = router;
