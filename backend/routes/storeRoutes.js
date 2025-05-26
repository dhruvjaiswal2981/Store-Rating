const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getDashboard } = require('../controllers/storeController');

router.use(authenticate, authorizeRoles('storeOwner'));

router.get('/dashboard', getDashboard);

module.exports = router;
