const express = require('express');
const { createFlag, getFlags } = require('../controllers/flagController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createFlag);
router.get('/', protect, getFlags);

module.exports = router;
