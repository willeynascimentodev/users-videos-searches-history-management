const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/authController');


router.post('/', login);
router.delete('/', logout);

module.exports = router;