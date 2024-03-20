// src/api/routes/auth.routes.js
import express from 'express';
import { getUserProfile, updateUserProfile, getUsers } from '../controllers/user.controller';
import verifyToken from '../../middlewares/verifyToken';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserProfile);
router.put('/:id', verifyToken, updateUserProfile);

export default router;
