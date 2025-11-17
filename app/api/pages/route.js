/**
 * @file Pages API routes
 * Handles CRUD operations for pages
 */

import { NextResponse } from 'next/server';
import {
  getPages,
  createPage
} from '@/lib/services/pages-service';

/**
 * GET /api/pages
 * Get all pages with optional filtering
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      published: searchParams.get('published') === 'true' ? true : searchParams.get('published') === 'false' ? false : undefined,
      reusable: searchParams.get('reusable') === 'true',
      template: searchParams.get('template'),
      status: searchParams.get('status'),
      search: searchParams.get('search')
    };

    const pages = await getPages(options);

    return NextResponse.json({
      success: true,
      data: pages,
      count: pages.length
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pages
 * Create a new page
 */
export async function POST(request) {
  try {
    const data = await request.json();

    const id = await createPage(data);

    return NextResponse.json({
      success: true,
      id,
      message: 'Page created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);

    if (error.message.includes('required fields') || error.message.includes('Invalid slug')) {
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
