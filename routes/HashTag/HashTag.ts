import { Router } from 'express';
import GetHashTags from '../../controllers/HashTag/GetHashTags';
import GetHashTag from '../../controllers/HashTag/GetHashTag';
import UpdateHashTag from '../../controllers/HashTag/UpdateHashTag';
import CreateHashTag from '../../controllers/HashTag/CreateHashTag';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import FollowHashTag from '../../controllers/HashTag/FollowHashTag';
import DeleteCreatedHashTag from '../../controllers/HashTag/DeleteCreatedHashTag';
import DeleteFollowedHashTag from '../../controllers/HashTag/DeleteFollowedHashTag';

const router = Router();

// Get HashTags
router.get('/', GetHashTags);

// Get HashTag
router.get('/:id', GetHashTag);

// Post HashTag
router.post('/', IsAuthenticated, CreateHashTag);

// Follow HashTag
router.put('/follow', IsAuthenticated, FollowHashTag);

// Put HashTag
router.put('/update', IsAuthenticated, UpdateHashTag);

// Delete Created HashTag
router.delete('/del/created', IsAuthenticated, DeleteCreatedHashTag);

// Delete Followed HashTag
router.delete('/del/followed', IsAuthenticated, DeleteFollowedHashTag);

export default router;
