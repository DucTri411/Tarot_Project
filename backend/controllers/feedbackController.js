const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, content, rating } = req.body;

    if (!name || !email || !content || !rating) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating phải từ 1 đến 5 sao!" });
    }

    await Feedback.create(name, email, content, rating);
    res.status(201).json({ message: "Cảm ơn bạn đã gửi feedback!" });
  } catch (err) {
    console.error("Lỗi khi gửi feedback:", err);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.getAll();
    res.json(feedbacks);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách feedback:", err);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.delete(id);
    res.json({ message: "Xóa feedback thành công!" });
  } catch (err) {
    console.error("Lỗi khi xóa feedback:", err);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
