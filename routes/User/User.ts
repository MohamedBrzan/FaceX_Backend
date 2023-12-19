import { Router } from 'express';
import GetAllUsers from '../../controllers/User/GetUsers';
import Register from '../../controllers/User/Register';
import Login from '../../controllers/User/Login';
import GetUser from '../../controllers/User/GetUser';
import UpdateUser from '../../controllers/User/UpdateUser';
import DeleteUser from '../../controllers/User/DeleteUser';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import GetMyProfile from '../../controllers/User/GetMyProfile';
import ReceiveFollow from '../../controllers/User/ReceiveFollow';
import SendFollow from '../../controllers/User/SendFollow';
import Logout from '../../controllers/User/Logout';
import BlockUser from '../../controllers/User/BlockUser';
import DeletionTiming from '../../controllers/User/DeletionTiming';
const router = Router();

// Get Users
router.get('/all', IsAuthenticated, GetAllUsers);

// Register User
router.post('/register', Register);

// Login User
router.get('/login', Login);

// Logout User
router.get('/logout', IsAuthenticated, Logout);

// User Profile
router.get('/me', IsAuthenticated, GetMyProfile);

// Follower
router.post('/follower', IsAuthenticated, ReceiveFollow);

// Following
router.post('/following', IsAuthenticated, SendFollow);

// Block User
router.put('/block', IsAuthenticated, BlockUser);

// Send Deletion Time
router.put('/deletion', IsAuthenticated, DeletionTiming);

// Get User
router.get('/:id', IsAuthenticated, GetUser);

// Put User
router.put('/:id', IsAuthenticated, UpdateUser);

// Delete User
router.delete('/:id', IsAuthenticated, DeleteUser);

export default router;
