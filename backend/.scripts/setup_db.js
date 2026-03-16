require("dotenv").config();
const mysql = require("mysql2");

// Connect to MySQL server (without specifying a database)
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root"
});

connection.query("CREATE DATABASE IF NOT EXISTS numerology_tarot", (err) => {
    if (err) {
        console.error("Error creating database:", err);
        process.exit(1);
    }
    
    // Switch to the database
    connection.query("USE numerology_tarot", (err) => {
        if (err) {
            console.error("Error using database:", err);
            process.exit(1);
        }
        
        // Create the users table
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('admin', 'user') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        connection.query(createTableSql, (err) => {
            if (err) {
                console.error("Error creating table:", err);
                process.exit(1);
            }
            console.log("Database and table 'users' setup completed successfully.");
            process.exit(0);
        });
    });
});
