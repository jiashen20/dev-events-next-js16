import { Event, IEvent } from '@/database/event.model';
import connectDB from '@/lib/mongodb';

/**
 * Fetches all events from the database
 * @returns Promise<IEvent[]> Array of all events
 */
export async function getAllEvents(): Promise<IEvent[]> {
  try {
    await connectDB();
    const events = await Event.find({}).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

/**
 * Fetches a single event by slug
 * @param slug - The slug of the event
 * @returns Promise<IEvent | null> The event or null if not found
 */
export async function getEventBySlug(slug: string): Promise<IEvent | null> {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    if (!event) {
      return null;
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error('Error fetching event:', error);
    throw new Error('Failed to fetch event');
  }
}

/**
 * Fetches similar events by slug (excludes the current event)
 * @param slug - The slug of the current event to exclude
 * @returns Promise<IEvent[]> Array of similar events
 */
export async function getSimilarEventsBySlug(slug: string): Promise<IEvent[]> {
  try {
    await connectDB();
    const events = await Event.find({ slug: { $ne: slug } })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching similar events:', error);
    return [];
  }
}

