/**
 * @file Component single item API routes
 * Handles individual component operations
 */

import { NextResponse } from 'next/server';
import {
  getComponent,
  updateComponent,
  deleteComponent,
  getBlockConfigurations
} from '@/lib/services/components-service';

/**
 * GET /api/components/[id]
 * Get a single component with optional block configurations
 */
export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const includeBlocks = searchParams.get('include_blocks') === 'true';

    const component = await getComponent(params.id);

    if (!component) {
      return NextResponse.json(
        { success: false, error: 'Component not found' },
        { status: 404 }
      );
    }

    // Include block configurations if requested
    if (includeBlocks) {
      const blocks = await getBlockConfigurations(params.id);
      component.blocks = blocks;
    }

    return NextResponse.json({
      success: true,
      data: component
    });
  } catch (error) {
    console.error('Error fetching component:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/components/[id]
 * Update a component
 */
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    await updateComponent(params.id, data);

    return NextResponse.json({
      success: true,
      message: 'Component updated successfully'
    });
  } catch (error) {
    console.error('Error updating component:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/components/[id]
 * Delete a component
 */
export async function DELETE(request, { params }) {
  try {
    await deleteComponent(params.id);

    return NextResponse.json({
      success: true,
      message: 'Component deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting component:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
