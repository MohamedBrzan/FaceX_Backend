import { Router } from 'express';

import IsAuthenticated from '../../middleware/IsAuthenticated';
import CreateJob from '../../controllers/Jobs/CreateJob';
import UpdateJob from '../../controllers/Jobs/UpdateJob';
import DeleteJob from '../../controllers/Jobs/DeleteJob';
import GetJobs from '../../controllers/Jobs/GetJobs';
import GetJob from '../../controllers/Jobs/GetJob';

const router = Router();

// Get Blogs
router.get('/', GetJobs);

// Get Blog
router.get('/:id', GetJob);

// Post Blog
router.post('/', IsAuthenticated, CreateJob);

// Put Blog
router.put('/:id', IsAuthenticated, UpdateJob);

// Delete Blog
router.delete('/:id', IsAuthenticated, DeleteJob);

export default router;
