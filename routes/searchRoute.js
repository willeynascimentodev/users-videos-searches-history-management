const express = require('express');
const router = express.Router();

const { insertSearch, searchList } = require('../controllers/searchController.js');
const { protect } = require('../middlewares/authMiddleware');
const { protectAdmin } = require('../middlewares/adminMiddleware');

router.post('/searches', protect, protectAdmin, insertSearch);
router.get('/users/:userId/searches', protect, protectAdmin, searchList);

module.exports = router;