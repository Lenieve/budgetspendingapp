const express = require('express');
const { addFixedExpense, getFixedExpenses, editFixedExpense, deleteFixedExpense } = require('../controllers/fixedExpenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addFixedExpense);
router.get('/', protect, getFixedExpenses);
router.put('/:id', protect, editFixedExpense);
router.delete('/:id', protect, deleteFixedExpense);

module.exports = router;
