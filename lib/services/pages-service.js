/**
 * @file Pages service for CMS
 * Handles all page-related operations
 */

import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  documentExists
} from '../firestore-helpers';
import { isValidSlug } from '../../types/cms';
import { Timestamp } from 'firebase/firestore';

const COLLECTION = 'pages';

/**
 * Get all pages with optional filtering
 * @param {Object} options - Query options
 * @returns {Promise<Array>}
 */
export async function getPages(options = {}) {
  const { published, reusable, template, status, search } = options;

  const filters = [];

  if (published !== undefined) {
    const statusValue = published ? 'published' : 'draft';
    filters.push({ field: 'status', operator: '==', value: statusValue });
  }

  if (reusable !== undefined) {
    filters.push({ field: 'is_reusable', operator: '==', value: reusable });
  }

  if (template) {
    filters.push({ field: 'template', operator: '==', value: template });
  }

  if (status) {
    filters.push({ field: 'status', operator: '==', value: status });
  }

  let pages = await getDocuments(COLLECTION, {
    filters,
    orderByField: 'updated_at',
    orderDirection: 'desc'
  });

  // Client-side search if needed
  if (search) {
    const searchLower = search.toLowerCase();
    pages = pages.filter(page =>
      page.title?.toLowerCase().includes(searchLower) ||
      page.slug?.toLowerCase().includes(searchLower) ||
      page.meta_description?.toLowerCase().includes(searchLower)
    );
  }

  return pages;
}

/**
 * Get a single page by ID
 * @param {string} id - Page ID
 * @returns {Promise<Object|null>}
 */
export async function getPage(id) {
  return await getDocumentById(COLLECTION, id);
}

/**
 * Get a page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>}
 */
export async function getPageBySlug(slug) {
  const pages = await getDocuments(COLLECTION, {
    filters: [{ field: 'slug', operator: '==', value: slug }],
    limit: 1
  });

  return pages.length > 0 ? pages[0] : null;
}

/**
 * Create a new page
 * @param {Object} data - Page data
 * @returns {Promise<string>} Document ID
 */
export async function createPage(data) {
  // Validate required fields
  if (!data.slug || !data.title) {
    throw new Error('Missing required fields: slug, title');
  }

  // Validate slug format
  if (!isValidSlug(data.slug)) {
    throw new Error('Invalid slug format. Use lowercase letters, numbers, and hyphens only');
  }

  // Check for duplicate slug
  const exists = await documentExists(COLLECTION, 'slug', data.slug);
  if (exists) {
    throw new Error('Page with this slug already exists');
  }

  // Set default values
  const pageData = {
    slug: data.slug,
    title: data.title,
    meta_description: data.meta_description || null,
    meta_keywords: data.meta_keywords || null,
    og_image: data.og_image || null,
    status: data.status || 'draft',
    template: data.template || 'standard',
    is_reusable: data.is_reusable || false,
    category: data.category || null,
    view_count: 0,
    published_at: data.status === 'published' ? Timestamp.now() : null
  };

  return await createDocument(COLLECTION, pageData);
}

/**
 * Update a page
 * @param {string} id - Page ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export async function updatePage(id, data) {
  const currentPage = await getPage(id);
  if (!currentPage) {
    throw new Error('Page not found');
  }

  // If slug is being updated, validate and check for duplicates
  if (data.slug && data.slug !== currentPage.slug) {
    if (!isValidSlug(data.slug)) {
      throw new Error('Invalid slug format. Use lowercase letters, numbers, and hyphens only');
    }

    const exists = await documentExists(COLLECTION, 'slug', data.slug);
    if (exists) {
      throw new Error('Page with this slug already exists');
    }
  }

  // Update published_at when status changes to published
  if (data.status === 'published' && currentPage.status !== 'published' && !currentPage.published_at) {
    data.published_at = Timestamp.now();
  }

  // Remove fields that shouldn't be updated directly
  const { created_at, view_count, ...updateData } = data;

  await updateDocument(COLLECTION, id, updateData);
}

/**
 * Delete a page
 * @param {string} id - Page ID
 * @returns {Promise<void>}
 */
export async function deletePage(id) {
  // TODO: Also delete associated content blocks
  await deleteDocument(COLLECTION, id);
}

/**
 * Increment page view count
 * @param {string} id - Page ID
 * @returns {Promise<void>}
 */
export async function incrementViewCount(id) {
  const page = await getPage(id);
  if (!page) {
    throw new Error('Page not found');
  }

  await updateDocument(COLLECTION, id, {
    view_count: (page.view_count || 0) + 1
  });
}

/**
 * Duplicate a page
 * @param {string} id - Page ID to duplicate
 * @param {string} [newSlug] - New slug for duplicated page
 * @returns {Promise<string>} New page ID
 */
export async function duplicatePage(id, newSlug) {
  const page = await getPage(id);
  if (!page) {
    throw new Error('Page not found');
  }

  // Generate new slug if not provided
  if (!newSlug) {
    newSlug = `${page.slug}-copy`;
    let counter = 1;
    while (await documentExists(COLLECTION, 'slug', newSlug)) {
      newSlug = `${page.slug}-copy-${counter}`;
      counter++;
    }
  }

  // Create duplicate with new slug
  const { id: _, created_at, updated_at, published_at, view_count, ...pageData } = page;

  return await createPage({
    ...pageData,
    slug: newSlug,
    title: `${page.title} (Copy)`,
    status: 'draft'
  });
}
