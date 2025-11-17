/**
 * @file Content block single item API routes
 * Handles individual block operations
 */

import { NextResponse } from 'next/server';
import {
  getBlock,
  updateBlock,
  deleteBlock,
  toggleBlockVisibility,
  duplicateBlock
} from '@/lib/services/blocks-service';

/**
 * GET /api/blocks/[id]
 * Get a single content block
 */
export async function GET(request, { params }) {
  try {
    const block = await getBlock(params.id);

    if (!block) {
      return NextResponse.json(
        { success: false, error: 'Block not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: block
    });
  } catch (error) {
    console.error('Error fetching block:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blocks/[id]
 * Update a content block
 */
export async function PUT(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'toggle_visibility') {
      await toggleBlockVisibility(params.id);

      return NextResponse.json({
        success: true,
        message: 'Block visibility toggled'
      });
    }

    const data = await request.json();
    await updateBlock(params.id, data);

    return NextResponse.json({
      success: true,
      message: 'Content block updated successfully'
    });
  } catch (error) {
    console.error('Error updating block:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blocks/[id]
 * Delete a content block
 */
export async function DELETE(request, { params }) {
  try {
    await deleteBlock(params.id);

    return NextResponse.json({
      success: true,
      message: 'Content block deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting block:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blocks/[id]
 * Special actions on a block (duplicate)
 */
export async function POST(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'duplicate') {
      const { newPageId } = await request.json();
      const newId = await duplicateBlock(params.id, newPageId);

      return NextResponse.json({
        success: true,
        id: newId,
        message: 'Block duplicated successfully'
      }, { status: 201 });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error performing block action:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
