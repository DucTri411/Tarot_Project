const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route công khai để khách hàng đặt lịch
router.post('/', bookingController.submitBooking);

module.exports = router;
