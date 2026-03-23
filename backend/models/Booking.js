const db = require('../db');

class Booking {
    static async create(bookingData) {
        const { name, email, service, date, time, notes } = bookingData;
        const query = `
            INSERT INTO bookings (name, email, service, date, time, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [name, email, service, date, time, notes]);
        return result;
    }

    static async getAll() {
        const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
        const [rows] = await db.query(query);
        return rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM bookings WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }
}

module.exports = Booking;
