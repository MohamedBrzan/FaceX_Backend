"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetVideos_1 = __importDefault(require("../../controllers/Video/GetVideos"));
const GetVideo_1 = __importDefault(require("../../controllers/Video/GetVideo"));
const UpdateVideo_1 = __importDefault(require("../../controllers/Video/UpdateVideo"));
const DeleteVideo_1 = __importDefault(require("../../controllers/Video/DeleteVideo"));
const UploadVideo_1 = __importDefault(require("../../controllers/Video/UploadVideo"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Videos
router.get('/', GetVideos_1.default);
// Get Video
router.get('/:id', GetVideo_1.default);
// Post Video
router.post('/', IsAuthenticated_1.default, UploadVideo_1.default);
// Put Video
router.put('/:id', IsAuthenticated_1.default, UpdateVideo_1.default);
// Delete Video
router.delete('/:id', IsAuthenticated_1.default, DeleteVideo_1.default);
exports.default = router;
