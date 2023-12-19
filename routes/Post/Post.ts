import { Router } from 'express';
import GetPosts from '../../controllers/Post/GetPosts';
import GetPost from '../../controllers/Post/GetPost';
import UpdatePost from '../../controllers/Post/UpdatePost';
import DeletePost from '../../controllers/Post/DeletePublishedPost';
import CreatePost from '../../controllers/Post/CreatePost';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Posts
router.get('/', GetPosts);

// Get Post
router.get('/:id', GetPost);

// Post Post
router.post('/', IsAuthenticated, CreatePost);

// Put Post
router.put('/:id', IsAuthenticated, UpdatePost);

// Delete Post
router.delete('/:id', IsAuthenticated, DeletePost);

export default router;
