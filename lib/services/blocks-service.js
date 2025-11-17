/**
 * @file Content blocks service for CMS
 * Handles all content block operations
 */

import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  batchUpdate
} from '../firestore-helpers';
import { getDefaultBlockContent, getDefaultLayout } from '../../types/cms';

const COLLECTION = 'content_blocks';

/**
 * Get all blocks for a page
 * @param {string} pageId - Page ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>}
 */
export async function getPageBlocks(pageId, options = {}) {
  const { visible_only = false } = options;

  const filters = [{ field: 'page_id', operator: '==', value: pageId }];

  if (visible_only) {
    filters.push({ field: 'is_visible', operator: '==', value: true });
  }

  return await getDocuments(COLLECTION, {
    filters,
    orderByField: 'display_order',
    orderDirection: 'asc'
  });
}

/**
 * Get a single block by ID
 * @param {string} id - Block ID
 * @returns {Promise<Object|null>}
 */
export async function getBlock(id) {
  return await getDocumentById(COLLECTION, id);
}

/**
 * Create a new content block
 * @param {Object} data - Block data
 * @returns {Promise<string>} Document ID
 */
export async function createBlock(data) {
  // Validate required fields
  if (!data.page_id || !data.block_type) {
    throw new Error('Missing required fields: page_id, block_type');
  }

  // Get current block count for the page to set display_order
  const existingBlocks = await getPageBlocks(data.page_id);
  const nextOrder = existingBlocks.length;

  // Set default values
  const blockData = {
    page_id: data.page_id,
    block_type: data.block_type,
    display_order: data.display_order !== undefined ? data.display_order : nextOrder,
    content: data.content || getDefaultBlockContent(data.block_type),
    layout: data.layout || getDefaultLayout(),
    parent_block_id: data.parent_block_id || null,
    is_visible: data.is_visible !== undefined ? data.is_visible : true
  };

  return await createDocument(COLLECTION, blockData);
}

/**
 * Update a content block
 * @param {string} id - Block ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export async function updateBlock(id, data) {
  // Remove fields that shouldn't be updated directly
  const { created_at, ...updateData } = data;

  await updateDocument(COLLECTION, id, updateData);
}

/**
 * Delete a content block
 * @param {string} id - Block ID
 * @returns {Promise<void>}
 */
export async function deleteBlock(id) {
  // Get all child blocks (nested blocks)
  const children = await getDocuments(COLLECTION, {
    filters: [{ field: 'parent_block_id', operator: '==', value: id }]
  });

  // Delete all children first
  for (const child of children) {
    await deleteDocument(COLLECTION, child.id);
  }

  // Delete the block
  await deleteDocument(COLLECTION, id);
}

/**
 * Reorder blocks within a page
 * @param {Array<{id: string, display_order: number}>} blocks - Blocks with new order
 * @returns {Promise<void>}
 */
export async function reorderBlocks(blocks) {
  const updates = blocks.map(block => ({
    id: block.id,
    data: { display_order: block.display_order }
  }));

  await batchUpdate(COLLECTION, updates);
}

/**
 * Toggle block visibility
 * @param {string} id - Block ID
 * @returns {Promise<void>}
 */
export async function toggleBlockVisibility(id) {
  const block = await getBlock(id);
  if (!block) {
    throw new Error('Block not found');
  }

  await updateBlock(id, {
    is_visible: !block.is_visible
  });
}

/**
 * Duplicate a content block
 * @param {string} id - Block ID to duplicate
 * @param {string} [newPageId] - Optional new page ID (defaults to same page)
 * @returns {Promise<string>} New block ID
 */
export async function duplicateBlock(id, newPageId) {
  const block = await getBlock(id);
  if (!block) {
    throw new Error('Block not found');
  }

  const { id: _, created_at, updated_at, ...blockData } = block;

  // Use new page ID if provided, otherwise use original
  if (newPageId) {
    blockData.page_id = newPageId;
  }

  return await createBlock(blockData);
}

/**
 * Delete all blocks for a page
 * @param {string} pageId - Page ID
 * @returns {Promise<void>}
 */
export async function deletePageBlocks(pageId) {
  const blocks = await getPageBlocks(pageId);

  for (const block of blocks) {
    await deleteDocument(COLLECTION, block.id);
  }
}
