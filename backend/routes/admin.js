const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const feedbackController = require('../controllers/feedbackController');
const bookingController = require('../controllers/bookingController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Tất cả endpoints admin đều yêu cầu Auth & Quyền Admin
router.use(verifyToken, isAdmin);

// GET /api/admin/stats
router.get('/stats', adminController.getDashboardStats);

// GET /api/admin/users
router.get('/users', adminController.getUsers);

// GET /api/admin/users/export
router.get('/users/export', adminController.exportUsersCSV);

// DELETE /api/admin/users/:id
router.delete('/users/:id', adminController.deleteUser);

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', adminController.updateUserRole);

// GET /api/admin/feedbacks
router.get('/feedbacks', feedbackController.getFeedbacks);

// DELETE /api/admin/feedbacks/:id
router.delete('/feedbacks/:id', feedbackController.deleteFeedback);

// GET /api/admin/bookings
router.get('/bookings', bookingController.getAllBookings);

// DELETE /api/admin/bookings/:id
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;
