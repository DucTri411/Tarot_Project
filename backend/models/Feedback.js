const db = require('../db');

const Feedback = {
  create: async (name, email, content, rating) => {
    const [result] = await db.query(
      "INSERT INTO feedbacks (name, email, content, rating) VALUES (?, ?, ?, ?)",
      [name, email, content, rating]
    );
    return result;
  },

  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM feedbacks ORDER BY created_at DESC");
    return rows;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM feedbacks WHERE id = ?", [id]);
    return result;
  }
};

module.exports = Feedback;
