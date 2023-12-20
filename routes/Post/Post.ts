import { Router } from 'express';
import GetPosts from '../../controllers/Post/GetPosts';
import GetPost from '../../controllers/Post/GetPost';
import UpdatePost from '../../controllers/Post/UpdatePost';
import DeletePost from '../../controllers/Post/Published/DeletePost';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import PublishPost from '../../controllers/Post/Published/CreatePost';
import DeletePublishedPost from '../../controllers/Post/Published/DeletePost';
import AddExpression from '../../controllers/Post/Published/AddExpression';
import DeleteExpression from '../../controllers/Post/Published/DeleteExpression';

const router = Router();

// Get Posts
router.get('/', GetPosts);

// Get Post
router.get('/:id', GetPost);

// Post Post
router.post('/published/create', IsAuthenticated, PublishPost);

// Add Expression for Published Posts
router.patch('/published/expressions/add', IsAuthenticated, AddExpression);

// Delete Expression for Published Posts
router.delete('/published/expressions/del', IsAuthenticated, DeleteExpression);

// Put Post
router.put('/:id', IsAuthenticated, UpdatePost);

// Delete Published Post
router.delete('/delete/published', IsAuthenticated, DeletePublishedPost);

// Delete Post
router.delete('/:id', IsAuthenticated, DeletePost);

export default router;
