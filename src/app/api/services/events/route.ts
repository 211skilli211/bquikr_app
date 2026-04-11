import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EVENTS = [
  {
    id: '1',
    title: 'Carnival Friday Night',
    description: 'Kick off Carnival with a spectacular street party',
    category: 'Festival',
    date: '2026-04-17',
    time: '20:00',
    location: 'Port of Spain, Trinidad',
    price: 25,
    priceType: 'ticket',
    currency: 'TTD',
    organizer: { name: 'NFC Carnival', verified: true },
    attendees: 2500,
    capacity: 5000,
  },
  {
    id: '2',
    title: 'Jamaica Independence Gala',
    description: 'Celebrate Jamaica independence with cuisine and reggae',
    category: 'Cultural',
    date: '2026-08-06',
    time: '18:00',
    location: 'Kingston, Jamaica',
    price: 1500,
    priceType: 'ticket',
    currency: 'JMD',
    organizer: { name: 'Jamaica Tourist Board', verified: true },
    attendees: 800,
    capacity: 1000,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const search = searchParams.get('search');

  let filteredEvents = [...EVENTS];

  if (category) {
    filteredEvents = filteredEvents.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }
  if (location) {
    filteredEvents = filteredEvents.filter(e => e.location.toLowerCase().includes(location.toLowerCase()));
  }
  if (search) {
    const searchLower = search.toLowerCase();
    filteredEvents = filteredEvents.filter(e => 
      e.title.toLowerCase().includes(searchLower) || 
      e.description.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json({ success: true, total: filteredEvents.length, events: filteredEvents });
}