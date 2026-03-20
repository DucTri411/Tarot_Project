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
  }
};

module.exports = User;
