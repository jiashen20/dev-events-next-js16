import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database/event.model';

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).lean();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

