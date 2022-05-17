const express = require('express');
const router = express.Router();

const { insertUser, updateUser, getUser, getUsers, deleteUser } = require('../controllers/userController');


router.post('/', insertUser);
router.get('/', getUsers);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;