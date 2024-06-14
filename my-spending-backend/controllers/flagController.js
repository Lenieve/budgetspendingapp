const Flag = require('../models/Flag');

exports.createFlag = async (req, res) => {
  const { name, color } = req.body;
  const user = req.user.id;

  try {
    const flag = await Flag.create({
      user,
      name,
      color
    });
    res.status(201).json({ success: true, data: flag });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getFlags = async (req, res) => {
  try {
    const flags = await Flag.find({ user: req.user.id });
    res.status(200).json({ success: true, data: flags });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
