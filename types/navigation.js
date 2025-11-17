/**
 * @file Navigation type definitions for the CMS
 * Based on oiaa-edmonton-islamic-school navigation system
 * Adapted for Firebase Firestore
 */

/**
 * @typedef {Object} NavigationItem
 * @property {string} id - Firestore document ID
 * @property {string} label_en - English label for the menu item
 * @property {string} [label_ar] - Arabic label (optional)
 * @property {string} href - URL path or external link
 * @property {number} level - Menu level (1 for top-level, 2 for sub-menu)
 * @property {string} [parent_id] - Parent item ID (required for level 2)
 * @property {number} display_order - Order of display in menu
 * @property {boolean} is_visible - Whether item is visible to users
 * @property {boolean} [is_featured] - Whether item is featured
 * @property {string} [description_en] - English description
 * @property {string} [description_ar] - Arabic description
 * @property {string} [icon] - Icon class or name
 * @property {string} [page_id] - Associated CMS page ID
 * @property {string} [meta_title_en] - SEO meta title (English)
 * @property {string} [meta_title_ar] - SEO meta title (Arabic)
 * @property {string} [meta_description_en] - SEO meta description (English)
 * @property {string} [meta_description_ar] - SEO meta description (Arabic)
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} NavigationItemWithChildren
 * @property {string} id
 * @property {string} label_en
 * @property {string} [label_ar]
 * @property {string} href
 * @property {number} display_order
 * @property {boolean} is_visible
 * @property {boolean} [is_featured]
 * @property {string} [description_en]
 * @property {string} [description_ar]
 * @property {string} [icon]
 * @property {string} [page_id]
 * @property {NavigationItemWithChildren[]} [children] - Nested sub-items
 */

/**
 * @typedef {Object} NavigationTreeNode
 * @property {string} id
 * @property {string} label
 * @property {string} href
 * @property {NavigationTreeNode[]} children
 */

/**
 * @typedef {Object} NavigationQueryFilters
 * @property {boolean} [visible_only] - Filter by visibility
 * @property {number} [level] - Filter by menu level
 * @property {string} [parent_id] - Filter by parent
 * @property {boolean} [featured_only] - Filter by featured status
 * @property {string} [sort_by] - Sort field (display_order, label_en, created_at)
 */

/**
 * Helper function to validate href format
 * @param {string} href - URL to validate
 * @returns {boolean}
 */
export function isValidHref(href) {
  if (!href || typeof href !== 'string') return false;
  return href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#');
}

/**
 * Helper function to build navigation tree from flat array
 * @param {NavigationItem[]} items - Flat array of navigation items
 * @returns {NavigationItemWithChildren[]}
 */
export function buildNavigationTree(items) {
  const topLevel = items.filter(item => item.level === 1);
  const subItems = items.filter(item => item.level === 2);

  return topLevel.map(parent => ({
    ...parent,
    children: subItems
      .filter(child => child.parent_id === parent.id)
      .sort((a, b) => a.display_order - b.display_order)
  })).sort((a, b) => a.display_order - b.display_order);
}

/**
 * Type guard to check if item is top-level
 * @param {NavigationItem} item
 * @returns {boolean}
 */
export function isTopLevelItem(item) {
  return item.level === 1 && !item.parent_id;
}

/**
 * Type guard to check if item is sub-menu item
 * @param {NavigationItem} item
 * @returns {boolean}
 */
export function isSubMenuItem(item) {
  return item.level === 2 && !!item.parent_id;
}
