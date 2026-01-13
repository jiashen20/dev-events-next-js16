import mongoose from 'mongoose';

// Type definition for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global variable to cache the connection
// This prevents multiple connections during development hot-reloads
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize the cache object
const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cache in global scope to persist across hot-reloads in development
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development.
 * 
 * @returns {Promise<typeof mongoose>} The Mongoose connection instance
 * @throws {Error} If MONGODB_URI is not defined or connection fails
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return cached connection if it exists and is ready
  if (cached.conn) {
    return cached.conn;
  }

  // Validate that MONGODB_URI is defined
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env'
    );
  }

  // Reuse existing connection promise if one is in progress
  // This prevents multiple simultaneous connection attempts
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable mongoose buffering
    };

    // Create and cache the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise on error to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;

