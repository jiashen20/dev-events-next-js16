export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Conf 2025",
    slug: "react-conf-2025",
    location: "San Francisco, CA",
    date: "March 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
  },
  {
    image: "/images/event2.png",
    title: "Next.js Conference",
    slug: "nextjs-conference",
    location: "San Francisco, CA",
    date: "April 10-11, 2025",
    time: "10:00 AM - 5:00 PM",
  },
  {
    image: "/images/event3.png",
    title: "DevHack 2025",
    slug: "devhack-2025",
    location: "New York, NY",
    date: "May 3-5, 2025",
    time: "24/7 Hackathon",
  },
  {
    image: "/images/event4.png",
    title: "TypeScript Summit",
    slug: "typescript-summit",
    location: "Seattle, WA",
    date: "June 20, 2025",
    time: "9:00 AM - 5:00 PM",
  },
  {
    image: "/images/event5.png",
    title: "AI & ML Developers Meetup",
    slug: "ai-ml-meetup",
    location: "Austin, TX",
    date: "July 12, 2025",
    time: "6:00 PM - 9:00 PM",
  },
  {
    image: "/images/event6.png",
    title: "Web3 Builders Hackathon",
    slug: "web3-builders-hackathon",
    location: "Miami, FL",
    date: "August 8-10, 2025",
    time: "48-Hour Hackathon",
  },
];

