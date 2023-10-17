import { Router } from 'express';
import GetComments from '../../controllers/Comment/GetComments';
import CreateComment from '../../controllers/Comment/CreateComment';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import DeleteComment from '../../controllers/Comment/DeleteComment';
import UpdateComment from '../../controllers/Comment/UpdateComment';
import GetComment from '../../controllers/Comment/GetComment';
const router = Router();

// Get Comments
router.get('/', GetComments);

// Get Comment
router.get('/:id', GetComment);

// Post Comment
router.post('/', IsAuthenticated, CreateComment);

// Put Comment
router.put('/:id', IsAuthenticated, UpdateComment);

// Delete Comment
router.delete('/', IsAuthenticated, DeleteComment);

export default router;
