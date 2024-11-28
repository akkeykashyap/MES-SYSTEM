const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

// View all channels the user has access to
router.get('/', channelController.index);

// View a specific channel
router.get('/:channelId', channelController.view);

module.exports = router;
