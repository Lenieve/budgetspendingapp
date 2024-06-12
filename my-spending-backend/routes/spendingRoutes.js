const express = require('express');
const { addSpending, getSpendings, editSpending, deleteSpending } = require('../controllers/spendingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addSpending);
router.get('/', protect, getSpendings);
router.put('/:id', protect, editSpending);
router.delete('/:id', protect, deleteSpending);

module.exports = router;
