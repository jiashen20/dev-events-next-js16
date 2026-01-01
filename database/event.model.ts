import mongoose, { Schema, Model, Document } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Event schema definition
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Title cannot be empty',
      },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Description cannot be empty',
      },
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Overview cannot be empty',
      },
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Image cannot be empty',
      },
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Venue cannot be empty',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Location cannot be empty',
      },
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be one of: online, offline, hybrid',
      },
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Audience cannot be empty',
      },
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: 'Agenda must be a non-empty array',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Organizer cannot be empty',
      },
    },
    tags: {
      type: [String],
      required: [true, 'Tags is required'],
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: 'Tags must be a non-empty array',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Generate URL-friendly slug from title
// Only regenerate if title has changed
(eventSchema as Schema<IEvent>).pre('save', async function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Normalize date to ISO format if it's a valid date string
  if (this.isModified('date') && this.date) {
    const dateObj = new Date(this.date);
    if (!isNaN(dateObj.getTime())) {
      this.date = dateObj.toISOString().split('T')[0]; // Store as YYYY-MM-DD
    }
  }

  // Normalize time format (HH:MM or HH:MM:SS)
  if (this.isModified('time') && this.time) {
    const timeMatch = this.time.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (timeMatch) {
      const hours = timeMatch[1].padStart(2, '0');
      const minutes = timeMatch[2];
      const seconds = timeMatch[3] || '00';
      this.time = `${hours}:${minutes}:${seconds}`;
    }
  }
});

// Add unique index on slug for faster lookups
eventSchema.index({ slug: 1 }, { unique: true });

// Create and export the Event model
export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

