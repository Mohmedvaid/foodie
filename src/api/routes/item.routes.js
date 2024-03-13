// src/api/routes/item.routes.js

import express from 'express';
import {
  createItem,
  updateItem,
  listItem,
  toggleItemAvailability
} from '../controllers/item.controller';
import verifyToken from '../../middlewares/verifyToken';
import isCooker from '../../middlewares/isCooker'; // Middleware to check if the user is a cooker

const router = express.Router();

router.post('/', verifyToken, isCooker, createItem);
router.put('/:itemId', verifyToken, isCooker, updateItem);
router.get('/', listItem);
router.patch('/:itemId/toggle-availability', verifyToken, isCooker, toggleItemAvailability);

export default router;
