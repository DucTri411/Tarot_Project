const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "numerology_tarot"
});

const alterTableSql = `
    ALTER TABLE bookings 
    ADD COLUMN status ENUM('Chưa thanh toán', 'Đã thanh toán') DEFAULT 'Chưa thanh toán'
`;

connection.query(alterTableSql, (err) => {
    if (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column 'status' already exists.");
            process.exit(0);
        } else {
            console.error("Error altering table:", err);
            process.exit(1);
        }
    } else {
        console.log("Database table 'bookings' altered successfully.");
        process.exit(0);
    }
});
