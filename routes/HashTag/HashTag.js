"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetHashTags_1 = __importDefault(require("../../controllers/HashTag/GetHashTags"));
const GetHashTag_1 = __importDefault(require("../../controllers/HashTag/GetHashTag"));
const UpdateHashTag_1 = __importDefault(require("../../controllers/HashTag/UpdateHashTag"));
const CreateHashTag_1 = __importDefault(require("../../controllers/HashTag/CreateHashTag"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const FollowHashTag_1 = __importDefault(require("../../controllers/HashTag/FollowHashTag"));
const DeleteCreatedHashTag_1 = __importDefault(require("../../controllers/HashTag/DeleteCreatedHashTag"));
const DeleteFollowedHashTag_1 = __importDefault(require("../../controllers/HashTag/DeleteFollowedHashTag"));
const router = (0, express_1.Router)();
// Get HashTags
router.get('/', GetHashTags_1.default);
// Get HashTag
router.get('/:id', GetHashTag_1.default);
// Post HashTag
router.post('/', IsAuthenticated_1.default, CreateHashTag_1.default);
// Follow HashTag
router.put('/follow', IsAuthenticated_1.default, FollowHashTag_1.default);
// Put HashTag
router.put('/update', IsAuthenticated_1.default, UpdateHashTag_1.default);
// Delete Created HashTag
router.delete('/del/created', IsAuthenticated_1.default, DeleteCreatedHashTag_1.default);
// Delete Followed HashTag
router.delete('/del/followed', IsAuthenticated_1.default, DeleteFollowedHashTag_1.default);
exports.default = router;
