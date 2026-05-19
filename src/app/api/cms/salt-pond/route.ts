import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

const ASSET_BASE = 'https://islandhub.onrender.com';

function resolveUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${ASSET_BASE}${url}`;
  return `${ASSET_BASE}/${url}`;
}

// GET all CMS data for salt-pond page
export async function GET() {
  try {
    // Get hero asset
    const heroResult = await sql`
      SELECT * FROM hero_assets WHERE page_key = 'salt-pond' LIMIT 1
    `;
    const hero = heroResult[0] ? {
      ...heroResult[0],
      asset_url: resolveUrl(heroResult[0].asset_url),
      icon_url: resolveUrl(heroResult[0].icon_url),
    } : null;

    // Get page content sections
    const contentResult = await sql`
      SELECT * FROM page_content 
      WHERE page_key = 'salt-pond' AND is_visible = true
      ORDER BY sort_order ASC
    `;

    // Get products
    const productsResult = await sql`
      SELECT * FROM product_assets 
      WHERE page_key = 'salt-pond' AND is_visible = true
      ORDER BY sort_order ASC
    `;

    return NextResponse.json({
      hero,
      content: contentResult,
      products: productsResult,
    });
  } catch (error: any) {
    console.error('Error fetching CMS data:', error);
    return NextResponse.json({ hero: null, content: [], products: [], error: error.message }, { status: 200 });
  }
}

// UPDATE hero asset
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { hero, content, products } = body;

    if (hero) {
      await sql`
        UPDATE hero_assets SET
          asset_url = COALESCE(${hero.asset_url}, asset_url),
          title = COALESCE(${hero.title}, title),
          subtitle = COALESCE(${hero.subtitle}, subtitle),
          cta_text = COALESCE(${hero.cta_text}, cta_text),
          cta_link = COALESCE(${hero.cta_link}, cta_link),
          cta2_text = COALESCE(${hero.cta2_text}, cta2_text),
          cta2_link = COALESCE(${hero.cta2_link}, cta2_link),
          overlay_color = COALESCE(${hero.overlay_color}, overlay_color),
          overlay_opacity = COALESCE(${hero.overlay_opacity}, overlay_opacity),
          style_config = COALESCE(${JSON.stringify(hero.style_config)}::jsonb, style_config),
          updated_at = NOW()
        WHERE page_key = 'salt-pond'
      `;
    }

    if (content && Array.isArray(content)) {
      for (const section of content) {
        await sql`
          UPDATE page_content SET
            content = ${JSON.stringify(section.content)}::jsonb,
            is_visible = COALESCE(${section.is_visible}, is_visible),
            sort_order = COALESCE(${section.sort_order}, sort_order),
            updated_at = NOW()
          WHERE page_key = 'salt-pond' AND section_key = ${section.section_key}
        `;
      }
    }

    if (products && Array.isArray(products)) {
      for (const product of products) {
        if (product.id) {
          // Update existing
          await sql`
            UPDATE product_assets SET
              name = COALESCE(${product.name}, name),
              description = COALESCE(${product.description}, description),
              weight = COALESCE(${product.weight}, weight),
              price = COALESCE(${product.price}, price),
              price_display = COALESCE(${product.price_display}, price_display),
              image_url = COALESCE(${product.image_url}, image_url),
              badge = COALESCE(${product.badge}, badge),
              is_visible = COALESCE(${product.is_visible}, is_visible),
              sort_order = COALESCE(${product.sort_order}, sort_order),
              updated_at = NOW()
            WHERE id = ${product.id} AND page_key = 'salt-pond'
          `;
        } else {
          // Insert new
          await sql`
            INSERT INTO product_assets (page_key, name, description, weight, price, price_display, image_url, badge, sort_order)
            VALUES ('salt-pond', ${product.name}, ${product.description}, ${product.weight}, ${product.price}, ${product.price_display}, ${product.image_url}, ${product.badge}, ${product.sort_order || 0})
          `;
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error: any) {
    console.error('Error updating CMS data:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    if (productId) {
      await sql`DELETE FROM product_assets WHERE id = ${productId} AND page_key = 'salt-pond'`;
      return NextResponse.json({ success: true, message: 'Product deleted' });
    }

    return NextResponse.json({ success: false, error: 'No productId provided' }, { status: 400 });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
