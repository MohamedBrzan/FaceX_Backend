import { Router } from 'express';
import GetComments from '../../controllers/Comment/GetComments';
import CreateComment from '../../controllers/Comment/CreateComment';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import DeleteComment from '../../controllers/Comment/DeleteComment';
import UpdateComment from '../../controllers/Comment/UpdateComment';
import GetComment from '../../controllers/Comment/GetComment';
import AddCommentExpression from '../../controllers/Comment/AddCommentExpression';
import DeleteCommentExpression from '../../controllers/Comment/DeleteCommentExpression';
const router = Router();

// Get Comments
router.get('/', GetComments);

// Post Comment
router.post('/create', IsAuthenticated, CreateComment);

// Put Comment
router.put('/update', IsAuthenticated, UpdateComment);

// Add Comment Expression
router.patch('/expressions/add', IsAuthenticated, AddCommentExpression);

// Add Comment Expression
router.delete('/expressions/del', IsAuthenticated, DeleteCommentExpression);

// Delete Comment
router.delete('/del', IsAuthenticated, DeleteComment);
// Get Comment
router.get('/:id', GetComment);

export default router;
