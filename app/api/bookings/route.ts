import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Booking } from '@/database/booking.model';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, email } = body;

    if (!eventId || !email) {
      return NextResponse.json(
        { error: 'Event ID and email are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ eventId, email });
    if (existingBooking) {
      return NextResponse.json(
        { error: 'You have already booked this event' },
        { status: 409 }
      );
    }

    // Create new booking
    const booking = await Booking.create({
      eventId,
      email,
    });

    return NextResponse.json(
      { message: 'Event booked successfully', booking },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    
    if (error.message?.includes('does not exist')) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'You have already booked this event' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

