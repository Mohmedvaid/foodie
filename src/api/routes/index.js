// src/routes/index.js
import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
const router = express.Router();

// GET - /api
router.get('/', (req, res) => res.json({ message: 'API is healthy' }));

// Mount auth routes at /auth
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
