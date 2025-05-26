const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  dashboard, createUser, createStore, listStores, listUsers
} = require('../controllers/adminController');

router.use(authenticate, authorizeRoles('admin'));

router.get('/dashboard', dashboard);
router.post('/users', createUser);
router.post('/stores', createStore);
router.get('/stores', listStores);
router.get('/users', listUsers);

module.exports = router;
