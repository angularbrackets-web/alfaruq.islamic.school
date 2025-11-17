# Enhanced CMS Implementation

This document describes the enhanced CMS system implemented for Al Faruq Islamic School website, based on the oiaa-edmonton-islamic-school CMS architecture.

## Overview

The CMS provides comprehensive content management capabilities including:

- **Multi-level navigation management** (2 levels with parent-child relationships)
- **Page management** with multiple templates and status workflows
- **Content blocks system** with 16 block types
- **Reusable components** for template-based content

## Architecture

### Database Collections (Firebase Firestore)

1. **navigation** - Navigation menu items
2. **pages** - CMS pages
3. **content_blocks** - Content blocks for pages
4. **reusable_components** - Reusable component definitions
5. **block_configurations** - Block configurations for reusable components
6. **component_instances** - Instances of components used in pages

### File Structure

```
/types/
  - navigation.js    # Navigation type definitions
  - cms.js           # CMS type definitions

/lib/
  - firestore-helpers.js    # Common Firestore operations
  /services/
    - navigation-service.js # Navigation business logic
    - pages-service.js      # Pages business logic
    - blocks-service.js     # Content blocks business logic
    - components-service.js # Reusable components business logic

/app/api/
  /navigation/
    - route.js           # GET, POST, PATCH endpoints
    /[id]/
      - route.js         # GET, PUT, DELETE endpoints
  /pages/
    - route.js           # GET, POST endpoints
    /[id]/
      - route.js         # GET, PUT, DELETE, POST (actions) endpoints
    /slug/[slug]/
      - route.js         # GET by slug endpoint
  /blocks/
    - route.js           # GET, POST, PATCH endpoints
    /[id]/
      - route.js         # GET, PUT, DELETE, POST (actions) endpoints
  /components/
    - route.js           # GET, POST endpoints
    /[id]/
      - route.js         # GET, PUT, DELETE endpoints
```

## Features

### Navigation Management

- **Multi-level menus**: Support for 2-level navigation hierarchy
- **Bilingual support**: English and Arabic labels
- **Visibility controls**: Show/hide menu items
- **Display ordering**: Custom order for menu items
- **SEO metadata**: Meta titles and descriptions
- **Page linking**: Associate CMS pages with navigation items

### Page Management

- **Status workflow**: Draft → Published → Archived
- **Multiple templates**: Standard, Landing, Gallery, Full Width
- **Reusable pages**: Pages that can be embedded as components
- **SEO optimization**: Meta descriptions, keywords, OG images
- **View tracking**: Track page views
- **Slug management**: URL-friendly slugs with validation

### Content Blocks

16 supported block types:

1. **Text** - Rich text content with alignment
2. **Image** - Images with captions and links
3. **Video** - YouTube/Vimeo or uploaded videos
4. **Hero** - Hero sections with background images/videos
5. **Card** - Individual card with image, title, description
6. **Cards Grid** - Grid of cards with configurable columns
7. **CTA** - Call-to-action blocks with buttons
8. **Section** - Container block for grouping
9. **Columns** - Multi-column layout
10. **Component Instance** - Embedded reusable component
11. **Page Embed** - Embedded CMS page
12. **Divider** - Horizontal divider
13. **Spacer** - Vertical spacing
14. **Accordion** - Expandable accordion items
15. **Tabs** - Tabbed content
16. **Form** - Form builder

Each block supports:
- Layout controls (width, padding, margins)
- Background and text colors
- Custom CSS classes
- Card styling (borders, shadows, hover effects)
- Visibility toggle
- Hierarchical nesting (parent-child relationships)

### Reusable Components

- **Component categories**: General, Header, Footer, Sidebar, Hero, CTA, Card, Form, Navigation
- **Block configurations**: Define component structure
- **Instance tracking**: Track usage across pages
- **Per-instance overrides**: Customize components per page
- **Usage analytics**: Monitor component usage

## API Endpoints

### Navigation

- `GET /api/navigation` - List navigation items (supports filtering, tree structure)
- `POST /api/navigation` - Create navigation item
- `PATCH /api/navigation?action=reorder` - Reorder items
- `GET /api/navigation/[id]` - Get single item
- `PUT /api/navigation/[id]` - Update item
- `PUT /api/navigation/[id]?action=toggle_visibility` - Toggle visibility
- `DELETE /api/navigation/[id]` - Delete item (cascades to children)

### Pages

- `GET /api/pages` - List pages (supports filtering by status, template, search)
- `POST /api/pages` - Create page
- `GET /api/pages/[id]` - Get single page
- `GET /api/pages/[id]?include_blocks=true` - Get page with blocks
- `PUT /api/pages/[id]` - Update page
- `DELETE /api/pages/[id]` - Delete page
- `POST /api/pages/[id]?action=duplicate` - Duplicate page
- `POST /api/pages/[id]?action=increment_views` - Increment view count
- `GET /api/pages/slug/[slug]` - Get page by slug

### Content Blocks

- `GET /api/blocks?page_id=[id]` - List blocks for a page
- `POST /api/blocks` - Create block
- `PATCH /api/blocks?action=reorder` - Reorder blocks
- `GET /api/blocks/[id]` - Get single block
- `PUT /api/blocks/[id]` - Update block
- `PUT /api/blocks/[id]?action=toggle_visibility` - Toggle visibility
- `DELETE /api/blocks/[id]` - Delete block
- `POST /api/blocks/[id]?action=duplicate` - Duplicate block

### Components

- `GET /api/components` - List components (supports filtering by category, search)
- `POST /api/components` - Create component
- `GET /api/components/[id]` - Get single component
- `GET /api/components/[id]?include_blocks=true` - Get component with blocks
- `PUT /api/components/[id]` - Update component
- `DELETE /api/components/[id]` - Delete component

## Data Models

### NavigationItem

```javascript
{
  id: string,
  label_en: string,
  label_ar?: string,
  href: string,
  level: 1 | 2,
  parent_id?: string,
  display_order: number,
  is_visible: boolean,
  is_featured?: boolean,
  description_en?: string,
  description_ar?: string,
  icon?: string,
  page_id?: string,
  meta_title_en?: string,
  meta_title_ar?: string,
  meta_description_en?: string,
  meta_description_ar?: string,
  created_at: Date,
  updated_at: Date
}
```

### Page

```javascript
{
  id: string,
  slug: string,
  title: string,
  meta_description?: string,
  meta_keywords?: string,
  og_image?: string,
  status: 'draft' | 'published' | 'archived',
  template: 'standard' | 'landing' | 'gallery' | 'full_width',
  is_reusable: boolean,
  category?: string,
  view_count: number,
  created_at: Date,
  updated_at: Date,
  published_at?: Date
}
```

### ContentBlock

```javascript
{
  id: string,
  page_id: string,
  block_type: BlockType,
  display_order: number,
  content: Object,
  layout: {
    container_width?: string,
    padding?: string,
    margin?: string,
    background_color?: string,
    text_color?: string,
    custom_css_classes?: string,
    card_style?: {
      border_radius?: string,
      shadow?: string,
      hover_effect?: boolean
    }
  },
  parent_block_id?: string,
  is_visible: boolean,
  created_at: Date,
  updated_at: Date
}
```

### ReusableComponent

```javascript
{
  id: string,
  name: string,
  description?: string,
  category: ComponentCategory,
  preview_image?: string,
  is_active: boolean,
  usage_count: number,
  created_at: Date,
  updated_at: Date
}
```

## Next Steps

### Admin UI (In Progress)

1. **Navigation Management UI** - CRUD interface for navigation items
2. **Pages Management UI** - Page listing, create, edit with block editor
3. **Components Management UI** - Component library management
4. **Block Editors** - Type-specific editors for each block type
5. **Layout Controls** - Visual editor for block layout properties

### Frontend Integration

1. **Dynamic Navigation** - Replace static navigation with CMS data
2. **Dynamic Page Renderer** - Render pages from CMS data
3. **Block Renderers** - Component for each block type
4. **Component Instance Renderer** - Render reusable components

### Future Enhancements

- **Media Library** - Central media management
- **Version History** - Track page/block changes
- **Publishing Workflow** - Review and approval process
- **Permissions System** - Role-based access control
- **Search Functionality** - Full-text search across content
- **Analytics Dashboard** - Content performance metrics
- **Multi-language Support** - Full bilingual content management
- **Import/Export** - Backup and restore functionality

## Usage Examples

### Creating a Navigation Item

```javascript
const response = await fetch('/api/navigation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    label_en: 'About Us',
    href: '/about',
    level: 1,
    display_order: 1,
    is_visible: true
  })
});
```

### Creating a Page with Blocks

```javascript
// 1. Create the page
const pageResponse = await fetch('/api/pages', {
  method: 'POST',
  body: JSON.stringify({
    slug: 'about-us',
    title: 'About Us',
    status: 'draft',
    template: 'standard'
  })
});
const { id: pageId } = await pageResponse.json();

// 2. Add content blocks
await fetch('/api/blocks', {
  method: 'POST',
  body: JSON.stringify({
    page_id: pageId,
    block_type: 'text',
    content: {
      text: '<h1>Welcome to Al Faruq Islamic School</h1><p>Our story...</p>',
      alignment: 'left'
    }
  })
});
```

## Troubleshooting

### Common Issues

1. **Slug validation errors**: Slugs must be lowercase, alphanumeric with hyphens only
2. **Level 2 items without parent**: Sub-menu items (level 2) require a parent_id
3. **Duplicate slugs/hrefs**: Each page slug and navigation href must be unique
4. **Missing required fields**: Check API error messages for required fields

### Testing

Test the API endpoints using the browser console or tools like Postman:

```javascript
// Test navigation endpoint
fetch('/api/navigation?tree=true')
  .then(r => r.json())
  .then(data => console.log(data));

// Test pages endpoint
fetch('/api/pages?status=published')
  .then(r => r.json())
  .then(data => console.log(data));
```

## Credits

Based on the comprehensive CMS system from [oiaa-edmonton-islamic-school](https://github.com/angularbrackets-web/oiaa-edmonton-islamic-school), adapted for Firebase Firestore instead of Supabase.
