const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        const existingUsers = await User.findByEmailOrUsername(email, username);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Email hoặc Username đã tồn tại" });
        }

        const hash = await bcrypt.hash(password, 10);
        
        // Chỉ nhận role là admin hoặc user (mặc định là user)
        const userRole = (role === "admin") ? "admin" : "user";

        await User.create(username, email, hash, userRole);

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
        console.error("Lỗi đăng ký:", err);
        res.status(500).json({ message: "Lỗi Server" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập Email và Mật khẩu" });
        }

        const users = await User.findByEmail(email);

        if (users.length === 0) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không chính xác" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Đăng nhập thành công!",
            token,
            user: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error("Lỗi đăng nhập:", err);
        res.status(500).json({ message: "Lỗi Server" });
    }
};

module.exports = {
    register,
    login
};
