const db = require('../db');

const User = {
  findByEmailOrUsername: async (email, username) => {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    return rows;
  },
  
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  },

  create: async (username, email, passwordHash, role) => {
    const [result] = await db.query(
      "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [username, email, passwordHash, role]
    );
    return result;
  },

  getAllUsers: async () => {
    const [rows] = await db.query("SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC");
    return rows;
  },

  deleteUser: async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  },

  updateRole: async (id, role) => {
    const [result] = await db.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    return result;
  },

  getStats: async () => {
    const [totalUsers] = await db.query("SELECT COUNT(*) as count FROM users");
    const [adminCount] = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
    const [userCount] = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'user'");
    
    // Giả lập thêm dữ liệu nếu sau này có bảng bookings, readings
    // Hiện tại chỉ trả về thống kê theo Users
    return {
      totalUsers: totalUsers[0].count,
      activeAdmins: adminCount[0].count,
      regularUsers: userCount[0].count,
      totalReadings: totalUsers[0].count * 3 + 12 // Dữ liệu giả định minh họa
    };
  }
};

module.exports = User;
