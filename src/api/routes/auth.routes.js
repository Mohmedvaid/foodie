// src/api/routes/auth.routes.js
import express from 'express';
import { register, login, refreshToken } from '../controllers/auth.controller';
import expressValidate from '../../middlewares/expressValidate';
import validateUser from '../validation/auth';

const router = express.Router();

router.post('/login', validateUser('login'), expressValidate, login);
router.post('/register', validateUser('register'), expressValidate, register);
router.post('/refresh-token', refreshToken);

export default router;
