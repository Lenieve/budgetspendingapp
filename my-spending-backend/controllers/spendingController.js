const Spending = require('../models/Spending');
const FixedExpense = require('../models/FixedExpense');
const Flag = require('../models/Flag');

exports.addSpending = async (req, res) => {
  const { description, amount, flagId } = req.body;
  const user = req.user.id;
  const date = new Date();
  
  // Calculate daily budget
  const { dailyBudget } = await calculateDailyBudget(user);

  // Get the last spending record to calculate the balance
  const lastSpending = await Spending.findOne({ user }).sort({ date: -1 });
  const lastBalance = lastSpending ? lastSpending.balance : 0;

  // Calculate the new balance
  const balance = lastBalance + dailyBudget - amount;

  try {
    const spending = await Spending.create({
      user,
      description,
      amount,
      balance,
      date,
      flag: flagId || null
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

// Function to calculate daily budget
const calculateDailyBudget = async (user) => {
  const fixedExpenses = await FixedExpense.find({ user });
  const totalFixedExpenses = fixedExpenses.reduce((total, expense) => total + expense.amount, 0);

  // Assume income is provided in the user's profile or another source
  const income = 3000; // Replace with actual value from user's profile

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const dailyBudget = (income - totalFixedExpenses) / daysInMonth;

  return { dailyBudget, totalFixedExpenses, income };
};

exports.calculateDailyLimit = async (req, res) => {
  try {
    const user = req.user.id;
    const { dailyBudget, totalFixedExpenses, income } = await calculateDailyBudget(user);

    res.status(200).json({ success: true, dailyBudget, totalFixedExpenses, income });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getDailyBalance = async (req, res) => {
  try {
    const user = req.user.id;
    const { dailyBudget } = await calculateDailyBudget(user);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysSpendings = await Spending.find({
      user,
      date: { $gte: today }
    });

    const todaysExpenses = todaysSpendings.reduce((total, spending) => total + spending.amount, 0);

    const lastSpending = await Spending.findOne({ user, date: { $lt: today } }).sort({ date: -1 });
    const lastBalance = lastSpending ? lastSpending.balance : 0;

    const remainingBalance = lastBalance + dailyBudget - todaysExpenses;

    res.status(200).json({ success: true, remainingBalance });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getSpendingsByFlag = async (req, res) => {
  try {
    const user = req.user.id;
    const { flagId } = req.params;

    const spendings = await Spending.find({ user, flag: flagId }).sort({ date: -1 });

    res.status(200).json({ success: true, data: spendings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};