import { Router } from 'express';
import IsAuthenticated from '../../../middleware/IsAuthenticated';
import GetReplies from '../../../controllers/Comment/Reply/GetReplies';
import CreateReply from '../../../controllers/Comment/Reply/CreateReply';
import UpdateReply from '../../../controllers/Comment/Reply/UpdateReply';
import DeleteReply from '../../../controllers/Comment/Reply/DeleteReply';
import GetReply from '../../../controllers/Comment/Reply/GetReply';
const router = Router();

// Get Replies
router.get('/', GetReplies);

// Get Reply
router.get('/:id', GetReply);

// Post Reply
router.post('/', IsAuthenticated, CreateReply);

// Put Reply
router.put('/:id', IsAuthenticated, UpdateReply);

// Delete Reply
router.delete('/', IsAuthenticated, DeleteReply);

export default router;
