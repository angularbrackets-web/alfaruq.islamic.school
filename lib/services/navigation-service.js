/**
 * @file Navigation service for CMS
 * Handles all navigation-related operations
 */

import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  batchUpdate,
  documentExists
} from '../firestore-helpers';
import { buildNavigationTree } from '../../types/navigation';

const COLLECTION = 'navigation';

/**
 * Get all navigation items with optional filtering
 * @param {Object} options - Query options
 * @returns {Promise<Array>}
 */
export async function getNavigationItems(options = {}) {
  const { visible_only, level, parent_id, featured_only, sort_by = 'display_order', tree = false } = options;

  const filters = [];

  if (visible_only) {
    filters.push({ field: 'is_visible', operator: '==', value: true });
  }

  if (level) {
    filters.push({ field: 'level', operator: '==', value: level });
  }

  if (parent_id) {
    filters.push({ field: 'parent_id', operator: '==', value: parent_id });
  }

  if (featured_only) {
    filters.push({ field: 'is_featured', operator: '==', value: true });
  }

  const items = await getDocuments(COLLECTION, {
    filters,
    orderByField: sort_by,
    orderDirection: 'asc'
  });

  if (tree) {
    return buildNavigationTree(items);
  }

  return items;
}

/**
 * Get a single navigation item by ID
 * @param {string} id - Navigation item ID
 * @returns {Promise<Object|null>}
 */
export async function getNavigationItem(id) {
  return await getDocumentById(COLLECTION, id);
}

/**
 * Create a new navigation item
 * @param {Object} data - Navigation item data
 * @returns {Promise<string>} Document ID
 */
export async function createNavigationItem(data) {
  // Validate required fields
  if (!data.label_en || !data.href || !data.level) {
    throw new Error('Missing required fields: label_en, href, level');
  }

  // Validate level and parent_id relationship
  if (data.level === 2 && !data.parent_id) {
    throw new Error('Level 2 items must have a parent_id');
  }

  if (data.level === 1 && data.parent_id) {
    throw new Error('Level 1 items cannot have a parent_id');
  }

  // Check for duplicate href
  const exists = await documentExists(COLLECTION, 'href', data.href);
  if (exists) {
    throw new Error('Navigation item with this href already exists');
  }

  // Set default values
  const itemData = {
    label_en: data.label_en,
    label_ar: data.label_ar || null,
    href: data.href,
    level: data.level,
    parent_id: data.parent_id || null,
    display_order: data.display_order || 0,
    is_visible: data.is_visible !== undefined ? data.is_visible : true,
    is_featured: data.is_featured || false,
    description_en: data.description_en || null,
    description_ar: data.description_ar || null,
    icon: data.icon || null,
    page_id: data.page_id || null,
    meta_title_en: data.meta_title_en || null,
    meta_title_ar: data.meta_title_ar || null,
    meta_description_en: data.meta_description_en || null,
    meta_description_ar: data.meta_description_ar || null
  };

  return await createDocument(COLLECTION, itemData);
}

/**
 * Update a navigation item
 * @param {string} id - Navigation item ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export async function updateNavigationItem(id, data) {
  // Remove fields that shouldn't be updated directly
  const { created_at, ...updateData } = data;

  return await updateDocument(COLLECTION, id, updateData);
}

/**
 * Delete a navigation item and its children
 * @param {string} id - Navigation item ID
 * @returns {Promise<void>}
 */
export async function deleteNavigationItem(id) {
  // Get all children items
  const children = await getDocuments(COLLECTION, {
    filters: [{ field: 'parent_id', operator: '==', value: id }]
  });

  // Delete all children first
  for (const child of children) {
    await deleteDocument(COLLECTION, child.id);
  }

  // Delete the parent item
  await deleteDocument(COLLECTION, id);
}

/**
 * Reorder navigation items
 * @param {Array<{id: string, display_order: number}>} items - Items with new order
 * @returns {Promise<void>}
 */
export async function reorderNavigationItems(items) {
  const updates = items.map(item => ({
    id: item.id,
    data: { display_order: item.display_order }
  }));

  await batchUpdate(COLLECTION, updates);
}

/**
 * Toggle navigation item visibility
 * @param {string} id - Navigation item ID
 * @returns {Promise<void>}
 */
export async function toggleNavigationVisibility(id) {
  const item = await getNavigationItem(id);
  if (!item) {
    throw new Error('Navigation item not found');
  }

  await updateNavigationItem(id, {
    is_visible: !item.is_visible
  });
}
