import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

const ASSET_BASE = (process.env.ASSET_BASE_URL || '').replace(/\/$/, '');

function resolveUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (ASSET_BASE && url.startsWith('/')) return `${ASSET_BASE}${url}`;
  return url;
}

function resolveAsset(asset: any) {
  if (!asset) return null;
  return {
    ...asset,
    asset_url: resolveUrl(asset.asset_url),
    icon_url: resolveUrl(asset.icon_url),
    typography: asset.typography ? JSON.parse(typeof asset.typography === 'string' ? asset.typography : JSON.stringify(asset.typography)) : {},
    style_config: asset.style_config ? JSON.parse(typeof asset.style_config === 'string' ? asset.style_config : JSON.stringify(asset.style_config)) : {},
  };
}

export async function GET() {
  try {
    const result = await sql`
      SELECT setting_key, setting_value, setting_type, description 
      FROM site_settings 
      ORDER BY setting_key
    `;
    const settings = result.map((s: any) => ({
      ...s,
      setting_value: resolveUrl(s.setting_value) || s.setting_value,
    }));
    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json([]);
    console.error('Error fetching site settings:', error);
    return NextResponse.json([], { status: 200 });
  }
}
