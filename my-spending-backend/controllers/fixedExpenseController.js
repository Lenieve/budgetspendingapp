const FixedExpense = require('../models/FixedExpense');

exports.addFixedExpense = async (req, res) => {
  const { description, amount } = req.body;
  const user = req.user.id;

  try {
    const fixedExpense = await FixedExpense.create({
      user,
      description,
      amount
    });
    res.status(201).json({ success: true, data: fixedExpense });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getFixedExpenses = async (req, res) => {
  try {
    const fixedExpenses = await FixedExpense.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: fixedExpenses });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.editFixedExpense = async (req, res) => {
  try {
    const fixedExpense = await FixedExpense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: fixedExpense });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteFixedExpense = async (req, res) => {
  try {
    await FixedExpense.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Fixed expense record deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
