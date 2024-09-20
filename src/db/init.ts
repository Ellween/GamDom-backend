import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

interface SampleEvent {
  name: string;
  odds: number;
}

interface SampleUser {
  username: string;
  password: string;
}

async function initDatabase(): Promise<void> {
  try {
    // Create sports_events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sports_events (
        event_id SERIAL PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        odds DECIMAL(5,2) NOT NULL
      )
    `);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    // Seed sample events
    const sampleEvents: SampleEvent[] = [
      { name: 'Soccer: Team A vs. Team B', odds: 1.75 },
      { name: 'Basketball: Team C vs. Team D', odds: 2.10 },
      { name: 'Tennis: Player E vs. Player F', odds: 1.90 },
    ];

    for (const event of sampleEvents) {
      await pool.query(
        'INSERT INTO sports_events (event_name, odds) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [event.name, event.odds]
      );
    }

    // Seed sample users
    const sampleUsers: SampleUser[] = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
    ];

    for (const user of sampleUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING',
        [user.username, hashedPassword]
      );
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDatabase();