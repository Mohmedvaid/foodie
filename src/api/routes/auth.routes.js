// src/api/routes/auth.routes.js
import express from 'express';
import {
  register,
  registerCooker,
  login,
  loginCooker,
  refreshToken
} from '../controllers/auth.controller';
import expressValidate from '../../middlewares/expressValidate';
import validateUser from '../validation/auth';

const router = express.Router();

router.post('/login', validateUser('login'), expressValidate, login);
router.post('/login/cooker', validateUser('login'), expressValidate, loginCooker);

router.post('/register', validateUser('register'), expressValidate, register);
router.post('/register/cooker', validateUser('register'), expressValidate, registerCooker);

router.post('/refresh-token', refreshToken);

export default router;
