import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { Event } from '../interfaces/Event';

dotenv.config();

export const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export const getAllEvents = async (): Promise<Event[]> => {
  const result: QueryResult<Event> = await pool.query('SELECT * FROM sports_events');
  return result.rows;
};