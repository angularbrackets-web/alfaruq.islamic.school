/**
 * @file Reusable components service for CMS
 * Handles all component-related operations
 */

import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument
} from '../firestore-helpers';

const COMPONENTS_COLLECTION = 'reusable_components';
const BLOCK_CONFIGS_COLLECTION = 'block_configurations';
const INSTANCES_COLLECTION = 'component_instances';

/**
 * Get all reusable components with optional filtering
 * @param {Object} options - Query options
 * @returns {Promise<Array>}
 */
export async function getComponents(options = {}) {
  const { category, active_only, search } = options;

  const filters = [];

  if (category) {
    filters.push({ field: 'category', operator: '==', value: category });
  }

  if (active_only) {
    filters.push({ field: 'is_active', operator: '==', value: true });
  }

  let components = await getDocuments(COMPONENTS_COLLECTION, {
    filters,
    orderByField: 'name',
    orderDirection: 'asc'
  });

  // Client-side search if needed
  if (search) {
    const searchLower = search.toLowerCase();
    components = components.filter(component =>
      component.name?.toLowerCase().includes(searchLower) ||
      component.description?.toLowerCase().includes(searchLower)
    );
  }

  return components;
}

/**
 * Get a single component by ID
 * @param {string} id - Component ID
 * @returns {Promise<Object|null>}
 */
export async function getComponent(id) {
  return await getDocumentById(COMPONENTS_COLLECTION, id);
}

/**
 * Create a new reusable component
 * @param {Object} data - Component data
 * @returns {Promise<string>} Document ID
 */
export async function createComponent(data) {
  // Validate required fields
  if (!data.name || !data.category) {
    throw new Error('Missing required fields: name, category');
  }

  // Set default values
  const componentData = {
    name: data.name,
    description: data.description || null,
    category: data.category,
    preview_image: data.preview_image || null,
    is_active: data.is_active !== undefined ? data.is_active : true,
    usage_count: 0
  };

  return await createDocument(COMPONENTS_COLLECTION, componentData);
}

/**
 * Update a component
 * @param {string} id - Component ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export async function updateComponent(id, data) {
  // Remove fields that shouldn't be updated directly
  const { created_at, usage_count, ...updateData } = data;

  await updateDocument(COMPONENTS_COLLECTION, id, updateData);
}

/**
 * Delete a component
 * @param {string} id - Component ID
 * @returns {Promise<void>}
 */
export async function deleteComponent(id) {
  // Delete all block configurations for this component
  const blockConfigs = await getBlockConfigurations(id);
  for (const config of blockConfigs) {
    await deleteDocument(BLOCK_CONFIGS_COLLECTION, config.id);
  }

  // Delete all instances of this component
  const instances = await getComponentInstances({ component_id: id });
  for (const instance of instances) {
    await deleteDocument(INSTANCES_COLLECTION, instance.id);
  }

  // Delete the component
  await deleteDocument(COMPONENTS_COLLECTION, id);
}

/**
 * Get block configurations for a component
 * @param {string} componentId - Component ID
 * @returns {Promise<Array>}
 */
export async function getBlockConfigurations(componentId) {
  return await getDocuments(BLOCK_CONFIGS_COLLECTION, {
    filters: [{ field: 'component_id', operator: '==', value: componentId }],
    orderByField: 'display_order',
    orderDirection: 'asc'
  });
}

/**
 * Create a block configuration
 * @param {Object} data - Block configuration data
 * @returns {Promise<string>} Document ID
 */
export async function createBlockConfiguration(data) {
  // Validate required fields
  if (!data.component_id || !data.block_type) {
    throw new Error('Missing required fields: component_id, block_type');
  }

  const configData = {
    component_id: data.component_id,
    block_type: data.block_type,
    display_order: data.display_order || 0,
    content: data.content || {},
    layout: data.layout || {}
  };

  return await createDocument(BLOCK_CONFIGS_COLLECTION, configData);
}

/**
 * Update a block configuration
 * @param {string} id - Configuration ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export async function updateBlockConfiguration(id, data) {
  const { created_at, ...updateData } = data;
  await updateDocument(BLOCK_CONFIGS_COLLECTION, id, updateData);
}

/**
 * Delete a block configuration
 * @param {string} id - Configuration ID
 * @returns {Promise<void>}
 */
export async function deleteBlockConfiguration(id) {
  await deleteDocument(BLOCK_CONFIGS_COLLECTION, id);
}

/**
 * Get component instances
 * @param {Object} options - Query options
 * @returns {Promise<Array>}
 */
export async function getComponentInstances(options = {}) {
  const { component_id, page_id } = options;

  const filters = [];

  if (component_id) {
    filters.push({ field: 'component_id', operator: '==', value: component_id });
  }

  if (page_id) {
    filters.push({ field: 'page_id', operator: '==', value: page_id });
  }

  return await getDocuments(INSTANCES_COLLECTION, { filters });
}

/**
 * Create a component instance
 * @param {Object} data - Instance data
 * @returns {Promise<string>} Document ID
 */
export async function createComponentInstance(data) {
  // Validate required fields
  if (!data.component_id || !data.page_id || !data.block_id) {
    throw new Error('Missing required fields: component_id, page_id, block_id');
  }

  const instanceData = {
    component_id: data.component_id,
    page_id: data.page_id,
    block_id: data.block_id,
    overrides: data.overrides || {}
  };

  const id = await createDocument(INSTANCES_COLLECTION, instanceData);

  // Increment usage count
  const component = await getComponent(data.component_id);
  if (component) {
    await updateDocument(COMPONENTS_COLLECTION, data.component_id, {
      usage_count: (component.usage_count || 0) + 1
    });
  }

  return id;
}

/**
 * Delete a component instance
 * @param {string} id - Instance ID
 * @returns {Promise<void>}
 */
export async function deleteComponentInstance(id) {
  const instance = await getDocumentById(INSTANCES_COLLECTION, id);

  if (instance) {
    // Decrement usage count
    const component = await getComponent(instance.component_id);
    if (component && component.usage_count > 0) {
      await updateDocument(COMPONENTS_COLLECTION, instance.component_id, {
        usage_count: component.usage_count - 1
      });
    }
  }

  await deleteDocument(INSTANCES_COLLECTION, id);
}

/**
 * Increment component usage count
 * @param {string} componentId - Component ID
 * @returns {Promise<void>}
 */
export async function incrementUsageCount(componentId) {
  const component = await getComponent(componentId);
  if (!component) {
    throw new Error('Component not found');
  }

  await updateDocument(COMPONENTS_COLLECTION, componentId, {
    usage_count: (component.usage_count || 0) + 1
  });
}
