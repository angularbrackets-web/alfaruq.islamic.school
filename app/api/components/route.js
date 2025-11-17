/**
 * @file Reusable components API routes
 * Handles CRUD operations for reusable components
 */

import { NextResponse } from 'next/server';
import {
  getComponents,
  createComponent
} from '@/lib/services/components-service';

/**
 * GET /api/components
 * Get all reusable components with optional filtering
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      category: searchParams.get('category'),
      active_only: searchParams.get('active') === 'true',
      search: searchParams.get('search')
    };

    const components = await getComponents(options);

    return NextResponse.json({
      success: true,
      data: components,
      count: components.length
    });
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/components
 * Create a new reusable component
 */
export async function POST(request) {
  try {
    const data = await request.json();

    const id = await createComponent(data);

    return NextResponse.json({
      success: true,
      id,
      message: 'Component created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating component:', error);

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
