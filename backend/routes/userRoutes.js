const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getStores, submitRating } = require('../controllers/userController');

router.use(authenticate, authorizeRoles('user'));

router.get('/stores', getStores);
router.post('/rating', submitRating);

module.exports = router;
