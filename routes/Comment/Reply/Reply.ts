import { Router } from 'express';
import IsAuthenticated from '../../../middleware/IsAuthenticated';
import GetReplies from '../../../controllers/Comment/Reply/GetReplies';
import CreateReply from '../../../controllers/Comment/Reply/CreateReply';
import UpdateReply from '../../../controllers/Comment/Reply/UpdateReply';
import DeleteReply from '../../../controllers/Comment/Reply/DeleteReply';
import GetReply from '../../../controllers/Comment/Reply/GetReply';
import AddReplyExpression from '../../../controllers/Comment/Reply/AddReplyExpression';
import DeleteReplyExpression from '../../../controllers/Comment/Reply/DeleteReplyExpression';
const router = Router();

// Get Replies
router.get('/', GetReplies);

// Get Reply
router.get('/:id', GetReply);

// Post Reply
router.post('/create', IsAuthenticated, CreateReply);

// Put Reply
router.put('/update', IsAuthenticated, UpdateReply);

// Add Reply Expression
router.patch('/expressions/add', IsAuthenticated, AddReplyExpression);

// Add Reply Expression
router.delete('/expressions/del', IsAuthenticated, DeleteReplyExpression);

// Delete Reply
router.delete('/del', IsAuthenticated, DeleteReply);

export default router;
