import { Request, Response } from 'express';
import * as eventService from '../services/eventService';
import { Event } from '../interfaces/Event';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events: Event[] = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};