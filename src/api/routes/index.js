// src/routes/index.js
import express from 'express';
const router = express.Router();

// GET - /api
router.get('/', (req, res) => res.json({ message: 'API is healthy' }));

module.exports = router;
