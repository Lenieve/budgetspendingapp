const express = require('express');
const { register, login, logout, validateToken } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/validate-token', validateToken);

module.exports = router;
