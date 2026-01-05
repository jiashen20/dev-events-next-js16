import React from 'react';
import Image from 'next/image';
import { getEventBySlug } from '@/lib/actions/event.actions';
import { IEvent } from '@/database/event.model';
import BookEvent from '@/components/BookEvent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event: IEvent | null = await getEventBySlug(slug);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-4">The event you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Image */}
        <div>
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{event.description}</p>
          </div>

          {/* Event Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/icons/pin.svg" alt="location" width={20} height={20} />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/calendar.svg" alt="date" width={20} height={20} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/clock.svg" alt="time" width={20} height={20} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/mode.svg" alt="mode" width={20} height={20} />
              <span className="capitalize">{event.mode}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/audience.svg" alt="audience" width={20} height={20} />
              <span>{event.audience}</span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700">{event.overview}</p>
          </div>

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Agenda</h2>
              <ul className="list-disc list-inside space-y-1">
                {event.agenda.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Booking Form */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Book This Event</h2>
            <BookEvent eventId={String(event._id)} eventTitle={event.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
