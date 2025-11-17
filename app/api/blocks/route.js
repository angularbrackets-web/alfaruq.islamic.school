/**
 * @file Content blocks API routes
 * Handles CRUD operations for content blocks
 */

import { NextResponse } from 'next/server';
import {
  getPageBlocks,
  createBlock,
  reorderBlocks
} from '@/lib/services/blocks-service';

/**
 * GET /api/blocks
 * Get blocks for a page
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('page_id');

    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'page_id parameter is required' },
        { status: 400 }
      );
    }

    const visible_only = searchParams.get('visible_only') === 'true';

    const blocks = await getPageBlocks(pageId, { visible_only });

    return NextResponse.json({
      success: true,
      data: blocks,
      count: blocks.length
    });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blocks
 * Create a new content block
 */
export async function POST(request) {
  try {
    const data = await request.json();

    const id = await createBlock(data);

    return NextResponse.json({
      success: true,
      id,
      message: 'Content block created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating block:', error);

    if (error.message.includes('required fields')) {
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
 * PATCH /api/blocks
 * Reorder content blocks
 */
export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'reorder') {
      const { blocks } = await request.json();

      if (!Array.isArray(blocks)) {
        return NextResponse.json(
          { success: false, error: 'Blocks must be an array' },
          { status: 400 }
        );
      }

      await reorderBlocks(blocks);

      return NextResponse.json({
        success: true,
        message: 'Content blocks reordered successfully'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating blocks:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
