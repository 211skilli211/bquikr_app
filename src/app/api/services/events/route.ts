import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Sample events data - In production, this would come from a database
const EVENTS = [
  {
    id: '1',
    title: 'Carnival Friday Night',
    description: 'Kick off Carnival with a spectacular street party featuring live soca music, costume bands, and traditional food stalls.',
    category: 'Festival',
    date: '2026-04-17',
    time: '20:00',
    endDate: '2026-04-18',
    endTime: '04:00',
    location: 'Port of Spain, Trinidad',
    venue: 'Broadway',
    isFeatured: true,
    price: 25,
    priceType: 'ticket',
    currency: 'TTD',
    organizer: {
      name: 'NFC Carnival',
      verified: true,
    },
    image: '/events/carnival.jpg',
    tags: ['carnival', 'music', 'festival', 'culture'],
    attendees: 2500,
    capacity: 5000,
    ageRestriction: 'all-ages',
    website: 'https://example.com',
  },
  {
    id: '2',
    title: 'Jamaica Independence Gala',
    description: 'Celebrate Jamaica\'s independence with an evening of Jamaican cuisine, reggae music, and cultural performances.',
    category: 'Cultural',
    date: '2026-08-06',
    time: '18:00',
    endDate: '2026-08-06',
    endTime: '23:00',
    location: 'Kingston, Jamaica',
    venue: 'National Stadium',
    isFeatured: true,
    price: 1500,
    priceType: 'ticket',
    currency: 'JMD',
    organizer: {
      name: 'Jamaica Tourist Board',
      verified: true,
    },
    image: '/events/independence.jpg',
    tags: ['independence', 'jamaica', 'reggae', 'food'],
    attendees: 800,
    capacity: 1000,
    ageRestriction: 'all-ages',
  },
  {
    id: '3',
    title: 'Cayman Islands Food Festival',
    description: 'Annual food festival showcasing Caribbean cuisine with celebrity chefs, local vendors, and cooking demonstrations.',
    category: 'Food',
    date: '2026-11-15',
    time: '11:00',
    endDate: '2026-11-17',
    endTime: '22:00',
    location: 'George Town, Cayman Islands',
    venue: 'Camana Bay',
    isFeatured: false,
    price: 0,
    priceType: 'free',
    currency: 'KYD',
    organizer: {
      name: 'Cayman Culinary Association',
      verified: true,
    },
    image: '/events/food-festival.jpg',
    tags: ['food', 'festival', 'cooking', 'family'],
    attendees: 3000,
    capacity: 5000,
    ageRestriction: 'all-ages',
  },
  {
    id: '4',
    title: 'Barbados Jazz Festival',
    description: 'Three days of world-class jazz performances featuring international and Caribbean artists.',
    category: 'Music',
    date: '2026-01-10',
    time: '19:00',
    endDate: '2026-01-12',
    endTime: '23:00',
    location: 'St. Michael, Barbados',
    venue: 'Farley Hill',
    isFeatured: true,
    price: 150,
    priceType: 'ticket',
    currency: 'BBD',
    organizer: {
      name: 'Barbados Tourism',
      verified: true,
    },
    image: '/events/jazz.jpg',
    tags: ['jazz', 'music', 'festival', 'artists'],
    attendees: 1200,
    capacity: 2000,
    ageRestriction: 'all-ages',
  },
  {
    id: '5',
    title: 'Aruba Beach Marathon',
    description: 'Annual beach marathon with 5K, 10K, half marathon and full marathon options along the beautiful Aruba coastline.',
    category: 'Sports',
    date: '2026-12-06',
    time: '05:00',
    endDate: '2026-12-06',
    endTime: '14:00',
    location: 'Palm Beach, Aruba',
    venue: 'Palm Beach',
    isFeatured: false,
    price: 75,
    priceType: 'registration',
    currency: 'AWG',
    organizer: {
      name: 'Aruba Sports Foundation',
      verified: true,
    },
    image: '/events/marathon.jpg',
    tags: ['marathon', 'running', 'sports', 'beach'],
    attendees: 500,
    capacity: 1000,
    ageRestriction: '16-plus',
  },
  {
    id: '6',
    title: 'Dominica Whale Watching Season',
    description: 'Join expert guides for an unforgettable whale and dolphin watching excursion in the waters off Dominica.',
    category: 'Nature',
    date: '2026-02-01',
    time: '09:00',
    endDate: '2026-04-30',
    endTime: '13:00',
    location: 'Roseau, Dominica',
    venue: 'Depart from Roseau Harbor',
    isFeatured: false,
    price: 85,
    priceType: 'ticket',
    currency: 'XCD',
    organizer: {
      name: 'Dominica Whale Watch',
      verified: true,
    },
    image: '/events/whales.jpg',
    tags: ['whales', 'nature', 'marine', 'tour'],
    attendees: 150,
    capacity: 20,
    ageRestriction: 'all-ages',
  },
];

const CATEGORIES = [
  'Festival',
  'Cultural',
  'Food',
  'Music',
  'Sports',
  'Nature',
  'Art',
  'Business',
  'Community',
];

// GET - List events with filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const date = searchParams.get('date');
  const featured = searchParams.get('featured');
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  let filteredEvents = [...EVENTS];

  // Filter by category
  if (category) {
    filteredEvents = filteredEvents.filter(
      e => e.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by location
  if (location) {
    filteredEvents = filteredEvents.filter(
      e => e.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Filter by date
  if (date) {
    filteredEvents = filteredEvents.filter(e => e.date >= date);
  }

  // Filter featured only
  if (featured === 'true') {
    filteredEvents = filteredEvents.filter(e => e.isFeatured);
  }

  // Search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredEvents = filteredEvents.filter(
      e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.tags?.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  const total = filteredEvents.length;
  const paginatedEvents = filteredEvents.slice(offset, offset + limit);

  // Return categories list if requested
  if (searchParams.get('categories') === 'true') {
    return NextResponse.json({
      success: true,
      categories: CATEGORIES,
    });
  }

  return NextResponse.json({
    success: true,
    total,
    limit,
    offset,
    events: paginatedEvents,
  });
}

// GET single event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Missing eventId' },
        { status: 400 }
      );
    }

    const event = EVENTS.find(e => e.id === eventId);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}