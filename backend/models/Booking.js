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

    static async getByEmail(email) {
        const query = 'SELECT * FROM bookings WHERE email = ? ORDER BY created_at DESC';
        const [rows] = await db.query(query, [email]);
        return rows;
    }

    static async updateByIdAndEmail(id, email, updateData) {
        const { date, time, notes } = updateData;
        const query = 'UPDATE bookings SET date = ?, time = ?, notes = ? WHERE id = ? AND email = ?';
        const [result] = await db.query(query, [date, time, notes, id, email]);
        return result;
    }

    static async updateStatus(id, email, status) {
        const query = 'UPDATE bookings SET status = ? WHERE id = ? AND email = ?';
        const [result] = await db.query(query, [status, id, email]);
        return result;
    }

    static async deleteByIdAndEmail(id, email) {
        const query = 'DELETE FROM bookings WHERE id = ? AND email = ?';
        const [result] = await db.query(query, [id, email]);
        return result;
    }

    static async delete(id) {
        const query = 'DELETE FROM bookings WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }
}

module.exports = Booking;
