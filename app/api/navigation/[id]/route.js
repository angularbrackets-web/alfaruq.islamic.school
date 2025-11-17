/**
 * @file Navigation single item API routes
 * Handles individual navigation item operations
 */

import { NextResponse } from 'next/server';
import {
  getNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
  toggleNavigationVisibility
} from '@/lib/services/navigation-service';

/**
 * GET /api/navigation/[id]
 * Get a single navigation item
 */
export async function GET(request, { params }) {
  try {
    const item = await getNavigationItem(params.id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Navigation item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching navigation item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/navigation/[id]
 * Update a navigation item
 */
export async function PUT(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'toggle_visibility') {
      await toggleNavigationVisibility(params.id);

      return NextResponse.json({
        success: true,
        message: 'Navigation item visibility toggled'
      });
    }

    const data = await request.json();
    await updateNavigationItem(params.id, data);

    return NextResponse.json({
      success: true,
      message: 'Navigation item updated successfully'
    });
  } catch (error) {
    console.error('Error updating navigation item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/navigation/[id]
 * Delete a navigation item and its children
 */
export async function DELETE(request, { params }) {
  try {
    await deleteNavigationItem(params.id);

    return NextResponse.json({
      success: true,
      message: 'Navigation item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting navigation item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
