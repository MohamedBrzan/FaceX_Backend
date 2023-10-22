"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetReels_1 = __importDefault(require("../../controllers/Reel/GetReels"));
const GetReel_1 = __importDefault(require("../../controllers/Reel/GetReel"));
const UpdateReel_1 = __importDefault(require("../../controllers/Reel/UpdateReel"));
const DeleteReel_1 = __importDefault(require("../../controllers/Reel/DeleteReel"));
const CreateReel_1 = __importDefault(require("../../controllers/Reel/CreateReel"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Reels
router.get('/', GetReels_1.default);
// Get Reel
router.get('/:id', GetReel_1.default);
// Post Reel
router.post('/', IsAuthenticated_1.default, CreateReel_1.default);
// Put Reel
router.put('/:id', IsAuthenticated_1.default, UpdateReel_1.default);
// Delete Reel
router.delete('/:id', IsAuthenticated_1.default, DeleteReel_1.default);
exports.default = router;
