import mongoose, { Schema, Model, Document, Types } from 'mongoose';
import { Event, IEvent } from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking schema definition
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Pre-save hook: Verify that the referenced event exists
// Throws an error if the event does not exist
(bookingSchema as Schema<IBooking>).pre('save', async function () {
  if (this.isModified('eventId') || this.isNew) {
    const event = await Event.findById(this.eventId);
    if (!event) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }
});

// Add index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Add compound index for common queries (event bookings by date)
bookingSchema.index({ eventId: 1, createdAt: 1 });

// Add index on email for faster lookups
bookingSchema.index({ email: 1 });

//enforce one booking per event per email
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'unique_event_email' });

// Create and export the Booking model
export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

