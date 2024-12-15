import express from 'express';
import { signUp, logIn, resetPassword, getUser } from '../controllers/user.controller.js';
import { checkLoggedIn } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', signUp); // User registration
router.post('/login', logIn);   // User login
router.post('/reset-password', resetPassword); // Reset password
router.get('/check-login', verifyToken, checkLoggedIn);
router.get('/getuser', getUser)
export default router;