const Booking = require('../models/Booking');

exports.submitBooking = async (req, res) => {
    try {
        const { name, email, service, date, time, notes } = req.body;
        
        if (!name || !email || !service || !date) {
            return res.status(400).json({ message: "Vui lòng nhập đủ các trường bắt buộc (Tên, Email, Dịch vụ, Ngày)!" });
        }

        await Booking.create({ name, email, service, date, time, notes });
        res.status(201).json({ message: "Đặt lịch thành công! AstroBunny sẽ sớm liên hệ với bạn." });
    } catch (error) {
        console.error("Error submitting booking:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi đặt lịch." });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAll();
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách đặt lịch." });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.delete(id);
        res.json({ message: "Đã xóa thông tin đặt lịch." });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Lỗi khi xóa đặt lịch." });
    }
};
