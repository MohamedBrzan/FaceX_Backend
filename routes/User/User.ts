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
import ActivateDeletion from '../../controllers/User/ActivateDeletion';
import DeactivateDeletion from '../../controllers/User/DeactivateDeletion';
import ActivateBan from '../../controllers/User/ActivateBan';
import DeactivateBan from '../../controllers/User/DeactivateBan';
import VerificationRequest from '../../controllers/User/VerificationRequest';
import ActivateVerification from '../../controllers/User/ActivateVerification';
import DeactivateVerification from '../../controllers/User/DeactivateVerification';
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

// Send Request For Verification
router.patch('/verification/request', IsAuthenticated, VerificationRequest);

// Accept Verification
router.patch('/verification/accept', IsAuthenticated, ActivateVerification);

// Reject Verification
router.patch('/verification/reject', IsAuthenticated, DeactivateVerification);

// Cancel Deletion Time
router.patch('/deletion/deactivate', IsAuthenticated, DeactivateDeletion);

// Block User
router.patch('/block', IsAuthenticated, BlockUser);

// Send Deletion Time
router.patch('/deletion/activate', IsAuthenticated, ActivateDeletion);

// Cancel Deletion Time
router.patch('/deletion/deactivate', IsAuthenticated, DeactivateDeletion);

// Activate Ban
router.patch('/ban/activate', IsAuthenticated, ActivateBan);

// Deactivate Ban
router.patch('/ban/deactivate', IsAuthenticated, DeactivateBan);

// Get User
router.get('/:id', IsAuthenticated, GetUser);

// Put User
router.put('/:id', IsAuthenticated, UpdateUser);

// Delete User
router.delete('/:id', IsAuthenticated, DeleteUser);

export default router;
