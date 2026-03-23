const pool = require('./db');
const bcrypt = require('bcrypt');

async function createAdmin() {
  try {
    const username = 'AstroBunny_Admin';
    const email = 'astrobunny_admin@gmail.com';
    const plainPassword = 'astrobunnyadmin123';
    const role = 'admin';

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

    console.log(`Creating admin user: ${username}...`);

    // Insert user into the database
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, role]
    );

    console.log(`Admin user created successfully! ID: ${result.insertId}`);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('An admin with this email or username already exists.');
    } else {
      console.error('Error creating admin:', error);
    }
  } finally {
    // Close the connection pool
    pool.end();
  }
}

createAdmin();
