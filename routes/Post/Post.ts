import { Router } from 'express';
import GetPosts from '../../controllers/Post/GetPosts';
import GetPost from '../../controllers/Post/GetPost';
import UpdatePost from '../../controllers/Post/UpdatePost';
import DeletePost from '../../controllers/Post/DeletePublishedPost';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import PublishPost from '../../controllers/Post/PublishPost';
import DeletePublishedPost from '../../controllers/Post/DeletePublishedPost';

const router = Router();

// Get Posts
router.get('/', GetPosts);

// Get Post
router.get('/:id', GetPost);

// Post Post
router.post('/', IsAuthenticated, PublishPost);

// Put Post
router.put('/:id', IsAuthenticated, UpdatePost);

// Delete Published Post
router.delete('/published', IsAuthenticated, DeletePublishedPost);

// Delete Post
router.delete('/:id', IsAuthenticated, DeletePost);

export default router;
