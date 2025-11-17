/**
 * @file Pages single item API routes
 * Handles individual page operations
 */

import { NextResponse } from 'next/server';
import {
  getPage,
  updatePage,
  deletePage,
  duplicatePage,
  incrementViewCount
} from '@/lib/services/pages-service';
import { getPageBlocks } from '@/lib/services/blocks-service';

/**
 * GET /api/pages/[id]
 * Get a single page with optional blocks
 */
export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const includeBlocks = searchParams.get('include_blocks') === 'true';

    const page = await getPage(params.id);

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Include blocks if requested
    if (includeBlocks) {
      const blocks = await getPageBlocks(params.id);
      page.blocks = blocks;
    }

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/pages/[id]
 * Update a page
 */
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    await updatePage(params.id, data);

    return NextResponse.json({
      success: true,
      message: 'Page updated successfully'
    });
  } catch (error) {
    console.error('Error updating page:', error);

    if (error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    if (error.message.includes('Invalid slug') || error.message.includes('already exists')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/pages/[id]
 * Delete a page
 */
export async function DELETE(request, { params }) {
  try {
    await deletePage(params.id);

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pages/[id]
 * Special actions on a page (duplicate, increment views)
 */
export async function POST(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'duplicate') {
      const { newSlug } = await request.json();
      const newId = await duplicatePage(params.id, newSlug);

      return NextResponse.json({
        success: true,
        id: newId,
        message: 'Page duplicated successfully'
      }, { status: 201 });
    }

    if (action === 'increment_views') {
      await incrementViewCount(params.id);

      return NextResponse.json({
        success: true,
        message: 'View count incremented'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error performing page action:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
