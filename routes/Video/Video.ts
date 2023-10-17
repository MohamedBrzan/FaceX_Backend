import { Router } from 'express';
import GetVideos from '../../controllers/Video/GetVideos';
import GetVideo from '../../controllers/Video/GetVideo';
import UpdateVideo from '../../controllers/Video/UpdateVideo';
import DeleteVideo from '../../controllers/Video/DeleteVideo';
import UploadVideo from '../../controllers/Video/UploadVideo';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Videos
router.get('/', GetVideos);

// Get Video
router.get('/:id', GetVideo);

// Post Video
router.post('/', IsAuthenticated, UploadVideo);

// Put Video
router.put('/:id', IsAuthenticated, UpdateVideo);

// Delete Video
router.delete('/:id', IsAuthenticated, DeleteVideo);

export default router;
