const Spending = require('../models/Spending');

exports.addSpending = async (req, res) => {
  const { description, amount } = req.body;
  const user = req.user.id;
  const date = new Date();
  
  // Calculate new balance based on the last spending record
  const lastSpending = await Spending.findOne({ user }).sort({ date: -1 });
  const balance = lastSpending ? lastSpending.balance - amount : -amount;

  try {
    const spending = await Spending.create({
      user,
      description,
      amount,
      balance,
      date
    });
    res.status(201).json({ success: true, data: spending });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getSpendings = async (req, res) => {
  try {
    const spendings = await Spending.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: spendings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.editSpending = async (req, res) => {
  try {
    const spending = await Spending.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: spending });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteSpending = async (req, res) => {
  try {
    await Spending.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Spending record deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
