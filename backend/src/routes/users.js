const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// 公开路由
router.post('/register', userController.register);
router.post('/login', userController.login);

// 受保护的路由
router.get('/profile', protect, userController.getProfile);
router.post('/logout', protect, userController.logout);

module.exports = router;