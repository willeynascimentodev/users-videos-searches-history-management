const express = require('express');
const router = express.Router();

const { insertSearch, searchList } = require('../controllers/searchController.js');
const { protect } = require('../middlewares/authMiddleware');

router.post('/searches', protect, insertSearch);
router.get('/users/:userId/searches', protect, searchList);

module.exports = router;