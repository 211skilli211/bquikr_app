import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface InfluencerProfile {
  id: string;
  name: string;
  personality: string;
  accent: string;
  voiceSample?: string;
  appearance: {
    style: string;
    age: string;
    ethnicity: string;
  };
  platform: string[];
  status: 'setup' | 'generating' | 'ready';
  createdAt: string;
}

interface VideoRequest {
  script: string;
  duration: number;
  style: 'talking' | 'action' | 'mixed';
}

const influencers: Map<string, InfluencerProfile> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    let response: any = { success: true };

    switch (action) {
      case 'create':
        const influencer: InfluencerProfile = {
          id: `INF-${Date.now()}`,
          name: data.name,
          personality: data.personality || 'friendly, professional',
          accent: data.accent || 'jamaican',
          appearance: {
            style: data.style || 'modern',
            age: data.age || '25-35',
            ethnicity: data.ethnicity || 'caribbean'
          },
          platform: data.platform || ['instagram', 'tiktok'],
          status: 'setup',
          createdAt: new Date().toISOString()
        };
        influencers.set(influencer.id, influencer);
        response.influencer = influencer;
        response.message = `Created influencer: ${influencer.name}. Ready for voice cloning setup.`;
        break;

      case 'voice-clone':
        const inf = influencers.get(data.influencerId);
        if (!inf) {
          return NextResponse.json({ error: 'Influencer not found' }, { status: 404 });
        }
        // In production: connect to Coqui/Bark for voice cloning
        inf.voiceSample = data.voiceUrl || null;
        inf.status = 'ready';
        influencers.set(inf.id, inf);
        response.influencer = inf;
        response.message = `Voice cloned for ${inf.name}. Voice sample attached.`;
        break;

      case 'generate-video':
        const target = influencers.get(data.influencerId);
        if (!target) {
          return NextResponse.json({ error: 'Influencer not found' }, { status: 404 });
        }
        // In production: connect to Runway/Kling for video generation
        response.video = {
          id: `VID-${Date.now()}`,
          influencerId: target.id,
          script: data.script,
          status: 'processing',
          message: 'Video generation started. This typically takes 2-5 minutes.',
          // Mock download URL (would be real in production)
          downloadUrl: null
        };
        break;

      case 'list':
        const all = Array.from(influencers.values());
        response.influencers = all;
        response.stats = {
          total: all.length,
          ready: all.filter(i => i.status === 'ready').length,
          setup: all.filter(i => i.status === 'setup').length
        };
        break;

      case 'get':
        const found = influencers.get(data.influencerId);
        if (!found) {
          return NextResponse.json({ error: 'Influencer not found' }, { status: 404 });
        }
        response.influencer = found;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Influencer API error:', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Digital Influencer API',
    actions: ['create', 'voice-clone', 'generate-video', 'list', 'get'],
    accents: ['jamaican', 'trinidadian', 'barbadian', 'guyanese', 'haitian', 'cuban', 'dominican'],
    platforms: ['instagram', 'tiktok', 'youtube', 'whatsapp', 'facebook']
  });
}