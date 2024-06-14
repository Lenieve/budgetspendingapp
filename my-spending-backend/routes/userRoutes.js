const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { calculateDailyLimit } = require('../controllers/spendingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/daily-limit', protect, calculateDailyLimit);

module.exports = router;
