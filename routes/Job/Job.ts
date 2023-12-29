import { Router } from 'express';

import IsAuthenticated from '../../middleware/IsAuthenticated';
import CreateJob from '../../controllers/Jobs/CreateJob';
import UpdateJob from '../../controllers/Jobs/UpdateJob';
import DeleteJob from '../../controllers/Jobs/DeleteJob';
import GetJobs from '../../controllers/Jobs/GetJobs';
import GetJob from '../../controllers/Jobs/GetJob';
import ApplyJob from '../../controllers/Jobs/ApplyJob';

const router = Router();

// Get Jobs
router.get('/', GetJobs);

// Get Job
router.get('/:id', GetJob);

// Post Job
router.post('/', IsAuthenticated, CreateJob);

// Post Job
router.patch('/apply', IsAuthenticated, ApplyJob);

// Put Job
router.put('/:id', IsAuthenticated, UpdateJob);

// Delete Job
router.delete('/:id', IsAuthenticated, DeleteJob);

export default router;
