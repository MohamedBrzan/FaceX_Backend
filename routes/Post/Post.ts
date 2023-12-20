import { Router } from 'express';
import GetPosts from '../../controllers/Post/GetPosts';
import GetPost from '../../controllers/Post/GetPost';
import CreatePost from '../../controllers/Post/CreatePost';
import AddExpression from '../../controllers/Post/AddPostExpression';
import UpdatePost from '../../controllers/Post/UpdatePost';
import DeleteExpression from '../../controllers/Post/DeletePostExpression';
import DeletePost from '../../controllers/Post/DeletePost';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import AddView from '../../controllers/Post/AddView';
import DeleteView from '../../controllers/Post/DeleteView';

const router = Router();

// Get Posts
router.get('/', GetPosts);

// Get Post
router.get('/:id', GetPost);

// Create Post
router.post('/create', IsAuthenticated, CreatePost);

// Add Expression for Posts
router.patch('/expressions/add', IsAuthenticated, AddExpression);

// Delete Expression for  Posts
router.delete('/expressions/del', IsAuthenticated, DeleteExpression);

// Update Post
router.put('/update', IsAuthenticated, UpdatePost);

// Add Post View
router.patch('/views/add', IsAuthenticated, AddView);

// Delete Post View
router.patch('/views/del', IsAuthenticated, DeleteView);

// Delete Post
router.delete('/del', IsAuthenticated, DeletePost);

export default router;
