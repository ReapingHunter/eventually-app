import express from 'express';
import { signUp, logIn, resetPassword } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', signUp); // User registration
router.post('/login', logIn);   // User login
router.post('/reset-password', resetPassword); // Reset password

export default router;