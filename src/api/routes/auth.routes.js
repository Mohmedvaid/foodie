// src/api/routes/auth.routes.js
import express from 'express';
import {
  registerEater,
  registerCooker,
  loginEater,
  loginCooker,
  refreshToken
} from '../controllers/auth.controller';
import expressValidate from '../../middlewares/expressValidate';
import validateUser from '../validation/auth';

const router = express.Router();

router.post('/login/eater', validateUser('login'), expressValidate, loginEater);
router.post('/login/cooker', validateUser('login'), expressValidate, loginCooker);

router.post('/register/eater', validateUser('register'), expressValidate, registerEater);
router.post('/register/cooker', validateUser('register'), expressValidate, registerCooker);

router.post('/refresh-token', refreshToken);

export default router;
