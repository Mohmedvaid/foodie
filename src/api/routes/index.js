// src/routes/index.js
import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import itemRoutes from './item.routes';
import orderRoutes from './order.routes';
import reviewRoutes from './review.routes';

const router = express.Router();

// GET - /api
router.get('/', (req, res) => res.json({ message: 'API is healthy' }));

// Mount auth routes at /auth
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/item', itemRoutes);
router.use('/order', orderRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
