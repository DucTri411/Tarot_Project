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

const query = "SELECT * FROM users WHERE username = 'DyTy'";
connection.query(query, (err, rows) => {
    if (err) {
        console.error("DB Error:", err);
    } else {
        console.log("User details:", rows);
    }
    process.exit(0);
});
