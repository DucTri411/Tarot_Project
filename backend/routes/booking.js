const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', bookingController.submitBooking);
router.get('/me', verifyToken, bookingController.getMyBookings);
router.put('/:id', verifyToken, bookingController.updateMyBooking);
router.patch('/:id/pay', verifyToken, bookingController.payMyBooking);
router.delete('/:id', verifyToken, bookingController.deleteMyBooking);

module.exports = router;
