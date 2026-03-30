const Booking = require('../models/Booking');
const User = require('../models/User');

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

exports.getMyBookings = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

        const bookings = await Booking.getByEmail(user.email);
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching my bookings:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách đặt lịch của tôi." });
    }
};

exports.updateMyBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, notes } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

        await Booking.updateByIdAndEmail(id, user.email, { date, time, notes });
        res.json({ message: "Cập nhật lịch thành công." });
    } catch (error) {
        console.error("Error updating my booking:", error);
        res.status(500).json({ message: "Lỗi khi cập nhật đặt lịch." });
    }
};

exports.payMyBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

        await Booking.updateStatus(id, user.email, 'Đã thanh toán');
        res.json({ message: "Thanh toán thành công. Chúng mình sẽ gửi mail xác nhận đến sớm nha" });
    } catch (error) {
        console.error("Error paying my booking:", error);
        res.status(500).json({ message: "Lỗi khi thanh toán." });
    }
};

exports.deleteMyBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

        await Booking.deleteByIdAndEmail(id, user.email);
        res.json({ message: "Đã hủy lịch đặt." });
    } catch (error) {
        console.error("Error deleting my booking:", error);
        res.status(500).json({ message: "Lỗi khi hủy đặt lịch." });
    }
};
