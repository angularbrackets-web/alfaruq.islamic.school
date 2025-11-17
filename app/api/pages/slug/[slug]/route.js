/**
 * @file Page by slug API route
 * Get a page by its slug
 */

import { NextResponse } from 'next/server';
import { getPageBySlug } from '@/lib/services/pages-service';
import { getPageBlocks } from '@/lib/services/blocks-service';

/**
 * GET /api/pages/slug/[slug]
 * Get a page by slug with optional blocks
 */
export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const includeBlocks = searchParams.get('include_blocks') === 'true';

    const page = await getPageBySlug(params.slug);

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Include blocks if requested
    if (includeBlocks) {
      const blocks = await getPageBlocks(page.id, { visible_only: true });
      page.blocks = blocks;
    }

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
