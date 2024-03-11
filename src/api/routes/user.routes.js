// src/api/routes/auth.routes.js
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();

router.get('/', verifyToken, getUserProfile);

export default router;
