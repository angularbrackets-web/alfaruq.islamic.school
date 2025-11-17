/**
 * @file Navigation API routes
 * Handles CRUD operations for navigation items
 */

import { NextResponse } from 'next/server';
import {
  getNavigationItems,
  createNavigationItem,
  reorderNavigationItems
} from '@/lib/services/navigation-service';

/**
 * GET /api/navigation
 * Get all navigation items with optional filtering
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      visible_only: searchParams.get('visible') === 'true',
      level: searchParams.get('level') ? parseInt(searchParams.get('level')) : null,
      parent_id: searchParams.get('parent_id'),
      featured_only: searchParams.get('featured') === 'true',
      sort_by: searchParams.get('sort_by') || 'display_order',
      tree: searchParams.get('tree') === 'true'
    };

    const items = await getNavigationItems(options);

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/navigation
 * Create a new navigation item
 */
export async function POST(request) {
  try {
    const data = await request.json();

    const id = await createNavigationItem(data);

    return NextResponse.json({
      success: true,
      id,
      message: 'Navigation item created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating navigation item:', error);

    if (error.message.includes('required fields') || error.message.includes('Level')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    if (error.message.includes('already exists')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/navigation
 * Reorder navigation items
 */
export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'reorder') {
      const { items } = await request.json();

      if (!Array.isArray(items)) {
        return NextResponse.json(
          { success: false, error: 'Items must be an array' },
          { status: 400 }
        );
      }

      await reorderNavigationItems(items);

      return NextResponse.json({
        success: true,
        message: 'Navigation items reordered successfully'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating navigation:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
