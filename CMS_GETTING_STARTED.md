# Enhanced CMS - Getting Started Guide

Welcome to the Enhanced CMS for Al Faruq Islamic School! This guide will help you get started with managing your website content.

## What's Been Implemented

### ✅ Core Features
- **Navigation Management**: Create and manage multi-level navigation menus
- **Page Management**: Create pages with different templates and status workflows
- **Content Blocks**: Add modular content blocks to your pages (16 types supported)
- **Reusable Components**: Create reusable content components (API ready, UI coming soon)

### ✅ API Routes
All backend API routes are fully implemented and working:
- Navigation CRUD operations
- Pages CRUD with blocks support
- Content blocks management
- Components management

### ✅ Admin UI
- Navigation management interface with tree view
- Pages listing with filtering and search
- Page creation wizard
- Basic page editor with block management
- Updated admin dashboard

## Accessing the CMS

1. **Login to Admin**: Navigate to `/admin/login`
2. **Admin Dashboard**: After login, you'll see `/admin` with two main CMS sections:
   - 🧭 Navigation Management
   - 📄 Pages & Content Blocks

## Quick Start: Creating Your First Page

### Step 1: Create a Page
1. Go to **Admin Dashboard** → **Pages & Content Blocks**
2. Click **"Create New Page"**
3. Fill in the details:
   - **Title**: e.g., "About Our School"
   - **Slug**: Auto-generated from title (e.g., "about-our-school")
   - **Template**: Choose "Standard" for most pages
   - **Status**: Select "Draft" while working
   - **Meta Description**: Brief description for SEO
4. Click **"Create Page"**

### Step 2: Add Content Blocks
After creating a page, you'll be taken to the edit screen:
1. Click **"Add Block"**
2. Select a block type:
   - **Text**: For paragraphs, headings, and formatted text
   - **Image**: For images with captions
   - **Hero**: For hero sections with backgrounds
   - **Cards Grid**: For grid layouts with cards
   - **CTA**: For call-to-action buttons
   - And more...
3. The block will be added with default content

### Step 3: Publish Your Page
1. Once content is added, click **"Publish"** in the top right
2. The page status changes from "Draft" to "Published"
3. Published pages are ready to be displayed on your website

## Quick Start: Managing Navigation

### Creating Navigation Items
1. Go to **Admin Dashboard** → **Navigation Management**
2. Click **"Add Navigation Item"**
3. Fill in:
   - **Label**: Display text (e.g., "About")
   - **URL/Href**: Link destination (e.g., "/about-our-school")
   - **Level**:
     - Level 1 for top menu items
     - Level 2 for dropdown sub-items
   - **Display Order**: Controls menu order (lower numbers appear first)
4. Click **"Create Navigation Item"**

### Creating Sub-Menu Items
1. First, create a Level 1 parent item
2. Click **"Add Navigation Item"** again
3. Select **Level 2**
4. Choose the **Parent Item** from the dropdown
5. Fill in other details and create

### Managing Visibility
- Click **"Hide"** to hide items without deleting them
- Click **"Show"** to make hidden items visible again
- Hidden items won't appear in the navigation menu

## Understanding Page Templates

### Standard Template
- General purpose pages with standard width content
- Best for: About pages, policies, general information

### Landing Template
- Full-width sections optimized for landing pages
- Best for: Campaign pages, event announcements

### Gallery Template
- Optimized for image-heavy content
- Best for: Photo galleries, visual showcases

### Full Width Template
- Maximum width content area
- Best for: Wide layouts, data displays

## Page Status Workflow

### Draft
- Work in progress
- Not visible to public
- Can be edited freely

### Published
- Live on the website
- Visible to public
- Can still be edited

### Archived
- No longer active
- Not visible to public
- Preserved for reference

## Content Block Types

### Currently Available (API Ready)
1. **Text** - Rich text content
2. **Image** - Images with captions and links
3. **Video** - YouTube, Vimeo, or uploaded videos
4. **Hero** - Hero sections with background images
5. **Card** - Individual content card
6. **Cards Grid** - Grid of multiple cards
7. **CTA** - Call-to-action blocks
8. **Section** - Container for grouping blocks
9. **Columns** - Multi-column layouts
10. **Divider** - Horizontal dividers
11. **Spacer** - Vertical spacing
12. **Accordion** - Expandable sections
13. **Tabs** - Tabbed content
14. **Form** - Form builder

### Block Features
- **Visibility Toggle**: Show/hide blocks without deleting
- **Reordering**: Change block order (API ready, UI coming)
- **Layout Controls**: Padding, margins, backgrounds (API ready)
- **Nesting**: Blocks can contain other blocks

## Firestore Collections

Your CMS data is stored in these Firebase Firestore collections:
- `navigation` - Navigation menu items
- `pages` - CMS pages
- `content_blocks` - Content blocks for pages
- `reusable_components` - Reusable component definitions
- `block_configurations` - Block configs for components
- `component_instances` - Component usage tracking

## What's Next?

### Coming Soon
1. **Enhanced Block Editors**: Visual editors for each block type
2. **Content Block Reordering UI**: Drag-and-drop block ordering
3. **Component Library UI**: Manage reusable components from admin
4. **Dynamic Page Renderer**: Render CMS pages on frontend
5. **Dynamic Navigation**: Replace static nav with CMS data
6. **Media Library**: Centralized media management
7. **Block Content Editing**: Rich editors for block content

### Current Limitations
- Block content editing is basic (JSON view)
- No drag-and-drop reordering yet
- Component UI not yet built
- Frontend rendering not implemented

## API Documentation

For developers, full API documentation is available in `CMS_README.md`, including:
- All API endpoints
- Request/response formats
- Data models
- Usage examples

## Testing Your CMS

### Create a Test Page
1. Create a page with slug "test-page"
2. Add some text blocks
3. Publish the page
4. Note: Frontend rendering coming soon

### Test API Directly
Open browser console and try:
```javascript
// Get all published pages
fetch('/api/pages?status=published')
  .then(r => r.json())
  .then(console.log);

// Get navigation tree
fetch('/api/navigation?tree=true')
  .then(r => r.json())
  .then(console.log);
```

## Support

For questions or issues:
1. Check `CMS_README.md` for detailed documentation
2. Review API endpoints and data models
3. Check browser console for errors
4. Verify Firebase Firestore permissions

## Tips

1. **Start with Navigation**: Create your menu structure first
2. **Use Drafts**: Work in draft mode, publish when ready
3. **SEO Matters**: Fill in meta descriptions and keywords
4. **Organize Pages**: Use consistent slug naming
5. **Test Visibility**: Use hide/show to test without deleting

---

## Example Workflow

Here's a complete example of setting up a new section:

### 1. Create "Programs" Page
- Title: "Our Programs"
- Slug: "programs"
- Template: Standard
- Status: Draft

### 2. Add Content
- Add Text block with introduction
- Add Cards Grid block with program cards
- Add CTA block for enrollment

### 3. Create Navigation
- Label: "Programs"
- Href: "/programs"
- Level: 1
- Visible: Yes

### 4. Add Sub-Items (Optional)
- Create Level 2 items under Programs:
  - "Elementary" → "/programs#elementary"
  - "Middle School" → "/programs#middle-school"

### 5. Publish
- Review content
- Click "Publish"
- Navigate to `/programs` (once frontend is implemented)

---

**Congratulations! Your Enhanced CMS is ready to use.** Start creating your navigation and pages, and watch for upcoming updates that will add the frontend rendering and advanced editing features.
