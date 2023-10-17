import { Router } from 'express';
import GetReels from '../../controllers/Reel/GetReels';
import GetReel from '../../controllers/Reel/GetReel';
import UpdateReel from '../../controllers/Reel/UpdateReel';
import DeleteReel from '../../controllers/Reel/DeleteReel';
import CreateReel from '../../controllers/Reel/CreateReel';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Reels
router.get('/', GetReels);

// Get Reel
router.get('/:id', GetReel);

// Post Reel
router.post('/', IsAuthenticated, CreateReel);

// Put Reel
router.put('/:id',IsAuthenticated, UpdateReel);

// Delete Reel
router.delete('/:id',IsAuthenticated, DeleteReel);

export default router;
