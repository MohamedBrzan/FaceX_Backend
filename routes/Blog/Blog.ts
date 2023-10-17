import { Router } from 'express';
import GetBlogs from '../../controllers/Blog/GetBlogs';
import GetBlog from '../../controllers/Blog/GetBlog';
import UpdateBlog from '../../controllers/Blog/UpdateBlog';
import DeleteBlog from '../../controllers/Blog/DeleteBlog';
import CreateBlog from '../../controllers/Blog/CreateBlog';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Blogs
router.get('/', GetBlogs);

// Get Blog
router.get('/:id', GetBlog);

// Post Blog
router.post('/', IsAuthenticated, CreateBlog);

// Put Blog
router.put('/:id', IsAuthenticated, UpdateBlog);

// Delete Blog
router.delete('/:id', IsAuthenticated, DeleteBlog);

export default router;
