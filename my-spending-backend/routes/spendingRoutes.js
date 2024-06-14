const express = require('express');
const { addSpending, getSpendings, editSpending, deleteSpending, getDailyBalance, getSpendingsByFlag } = require('../controllers/spendingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addSpending);
router.get('/', protect, getSpendings);
router.put('/:id', protect, editSpending);
router.delete('/:id', protect, deleteSpending);
router.get('/daily-balance', protect, getDailyBalance);
router.get('/flag/:flagId', protect, getSpendingsByFlag);

module.exports = router;
