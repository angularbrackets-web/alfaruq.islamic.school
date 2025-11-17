/**
 * @file CMS type definitions for pages, blocks, and components
 * Based on oiaa-edmonton-islamic-school CMS system
 * Adapted for Firebase Firestore
 */

/**
 * @typedef {'draft' | 'published' | 'archived'} PageStatus
 */

/**
 * @typedef {'standard' | 'landing' | 'gallery' | 'full_width'} PageTemplate
 */

/**
 * @typedef {Object} Page
 * @property {string} id - Firestore document ID
 * @property {string} slug - URL-friendly slug
 * @property {string} title - Page title
 * @property {string} [meta_description] - SEO meta description
 * @property {string} [meta_keywords] - SEO keywords (comma-separated)
 * @property {string} [og_image] - Open Graph image URL
 * @property {PageStatus} status - Publication status
 * @property {PageTemplate} template - Page template type
 * @property {boolean} is_reusable - Can be embedded as component
 * @property {string} [category] - Page category for organization
 * @property {number} [view_count] - Number of views
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 * @property {Date} [published_at] - Publication timestamp
 */

/**
 * @typedef {'text' | 'image' | 'video' | 'section' | 'columns' | 'hero' | 'card' | 'cards_grid' | 'cta' | 'component_instance' | 'page_embed' | 'divider' | 'spacer' | 'accordion' | 'tabs' | 'form'} BlockType
 */

/**
 * @typedef {Object} ContentBlock
 * @property {string} id - Firestore document ID
 * @property {string} page_id - Parent page ID
 * @property {BlockType} block_type - Type of content block
 * @property {number} display_order - Order of block in page
 * @property {Object} content - Block-specific content data
 * @property {Object} [layout] - Layout configuration
 * @property {string} [layout.container_width] - full | wide | standard | narrow
 * @property {string} [layout.padding] - Padding (e.g., "md", "lg")
 * @property {string} [layout.margin] - Margin (e.g., "md", "lg")
 * @property {string} [layout.background_color] - Background color
 * @property {string} [layout.text_color] - Text color
 * @property {string} [layout.custom_css_classes] - Custom CSS classes
 * @property {Object} [layout.card_style] - Card-specific styles
 * @property {string} [layout.card_style.border_radius] - Border radius
 * @property {string} [layout.card_style.shadow] - Shadow intensity
 * @property {boolean} [layout.card_style.hover_effect] - Enable hover effects
 * @property {string} [parent_block_id] - Parent block ID for nesting
 * @property {boolean} is_visible - Whether block is visible
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} TextBlockContent
 * @property {string} text - HTML or markdown text content
 * @property {string} [heading] - Optional heading
 * @property {string} [alignment] - left | center | right | justify
 */

/**
 * @typedef {Object} ImageBlockContent
 * @property {string} url - Image URL (Cloudinary or Firebase Storage)
 * @property {string} [alt] - Alt text for accessibility
 * @property {string} [caption] - Image caption
 * @property {string} [link] - Optional link URL
 * @property {number} [width] - Image width
 * @property {number} [height] - Image height
 */

/**
 * @typedef {Object} VideoBlockContent
 * @property {string} url - Video URL (YouTube/Vimeo or uploaded)
 * @property {string} [thumbnail] - Thumbnail image URL
 * @property {boolean} [autoplay] - Auto-play video
 * @property {boolean} [controls] - Show video controls
 * @property {string} [caption] - Video caption
 */

/**
 * @typedef {Object} HeroBlockContent
 * @property {string} title - Hero title
 * @property {string} [subtitle] - Hero subtitle
 * @property {string} [background_image] - Background image URL
 * @property {string} [background_video] - Background video URL
 * @property {string} [cta_text] - Call-to-action button text
 * @property {string} [cta_link] - Call-to-action button link
 * @property {string} [alignment] - left | center | right
 */

/**
 * @typedef {Object} CardBlockContent
 * @property {string} [image] - Card image URL
 * @property {string} title - Card title
 * @property {string} [description] - Card description
 * @property {string} [link] - Card link URL
 * @property {string} [link_text] - Link button text
 */

/**
 * @typedef {Object} CardsGridBlockContent
 * @property {CardBlockContent[]} cards - Array of cards
 * @property {number} columns - Number of columns (2, 3, 4)
 * @property {string} [grid_gap] - Gap between cards
 */

/**
 * @typedef {Object} CTABlockContent
 * @property {string} heading - CTA heading
 * @property {string} [description] - CTA description
 * @property {string} primary_button_text - Primary button text
 * @property {string} primary_button_link - Primary button link
 * @property {string} [secondary_button_text] - Secondary button text
 * @property {string} [secondary_button_link] - Secondary button link
 */

/**
 * @typedef {Object} ComponentInstanceBlockContent
 * @property {string} component_id - Reusable component ID
 * @property {Object} [overrides] - Instance-specific overrides
 */

/**
 * @typedef {Object} PageEmbedBlockContent
 * @property {string} page_id - Embedded page ID
 */

/**
 * @typedef {'general' | 'header' | 'footer' | 'sidebar' | 'hero' | 'cta' | 'card' | 'form' | 'navigation'} ComponentCategory
 */

/**
 * @typedef {Object} ReusableComponent
 * @property {string} id - Firestore document ID
 * @property {string} name - Component name
 * @property {string} [description] - Component description
 * @property {ComponentCategory} category - Component category
 * @property {string} preview_image - Preview image URL
 * @property {boolean} is_active - Whether component is active
 * @property {number} usage_count - Number of times used
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} BlockConfiguration
 * @property {string} id - Firestore document ID
 * @property {string} component_id - Parent component ID
 * @property {BlockType} block_type - Type of block
 * @property {number} display_order - Order in component
 * @property {Object} content - Block content
 * @property {Object} [layout] - Layout configuration
 * @property {Date} created_at - Creation timestamp
 */

/**
 * @typedef {Object} ComponentInstance
 * @property {string} id - Firestore document ID
 * @property {string} component_id - Reusable component ID
 * @property {string} page_id - Page where component is used
 * @property {string} block_id - Content block ID
 * @property {Object} [overrides] - Instance-specific overrides
 * @property {Date} created_at - Creation timestamp
 */

/**
 * Validate slug format
 * @param {string} slug - Slug to validate
 * @returns {boolean}
 */
export function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Generate default content for block type
 * @param {BlockType} blockType
 * @returns {Object}
 */
export function getDefaultBlockContent(blockType) {
  const defaults = {
    text: { text: '', alignment: 'left' },
    image: { url: '', alt: '' },
    video: { url: '', controls: true, autoplay: false },
    hero: { title: '', alignment: 'center' },
    card: { title: '', description: '' },
    cards_grid: { cards: [], columns: 3 },
    cta: { heading: '', primary_button_text: 'Learn More', primary_button_link: '#' },
    component_instance: { component_id: '', overrides: {} },
    page_embed: { page_id: '' },
    section: {},
    columns: { column_count: 2 },
    divider: {},
    spacer: { height: '2rem' },
    accordion: { items: [] },
    tabs: { tabs: [] },
    form: { fields: [] }
  };

  return defaults[blockType] || {};
}

/**
 * Get default layout configuration
 * @returns {Object}
 */
export function getDefaultLayout() {
  return {
    container_width: 'standard',
    padding: 'md',
    margin: 'md',
    background_color: '',
    text_color: '',
    custom_css_classes: '',
    card_style: {
      border_radius: 'md',
      shadow: 'sm',
      hover_effect: false
    }
  };
}
