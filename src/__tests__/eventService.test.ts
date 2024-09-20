import { getAllEvents } from '../services/eventService';
import { Pool } from 'pg';
import { Event } from '../interfaces/Event';

// Mock the pg module
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('eventService', () => {
  let pool: jest.Mocked<Pool>;

  beforeEach(() => {
    jest.clearAllMocks();
    pool = new Pool() as jest.Mocked<Pool>;
  });

  it('should return all events', async () => {
    const mockEvents: Event[] = [
      { event_id: 1, event_name: 'Test Event 1', odds: 1.5 },
      { event_id: 2, event_name: 'Test Event 2', odds: 2.0 },
    ];

    (pool.query as jest.Mock).mockResolvedValue({ rows: mockEvents });

    const events = await getAllEvents();

    expect(events).toEqual(mockEvents);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM sports_events');
  });

  it('should throw an error if the query fails', async () => {
    const error = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(error);

    await expect(getAllEvents()).rejects.toThrow('Database error');
  });
});