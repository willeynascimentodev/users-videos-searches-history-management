const express = require('express');
const router = express.Router();

const { insertUser, updateUser, getUser, getUsers, deleteUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, insertUser);
router.get('/', protect, getUsers);
router.get('/:userId', protect, getUser);
router.put('/:userId', protect, updateUser);
router.delete('/:userId', protect, deleteUser);

module.exports = router;