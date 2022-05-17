const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', login);

module.exports = router;