const express = require('express');
const router = express.Router();

const { getVideos } = require('../controllers/videoController.js');
const { protect } = require('../middlewares/authMiddleware');


router.get('/', protect, getVideos);

module.exports = router;