# SEO Settings Setup Guide

## Overview
All SEO settings are now stored in Firebase and can be edited through the admin panel. This includes:
- Meta titles and descriptions
- Keywords
- School information (name, location, address)
- Geographic coordinates
- Open Graph / Social media tags

## Initial Setup

### Step 1: Initialize SEO Data in Firebase

**Option A: Via Admin Panel (Recommended)**

1. Login to admin at `/admin/login`
2. Go to `/admin/initialize-seo`
3. Click "🚀 Initialize SEO Settings"
4. Wait for confirmation message

**Option B: Via Command Line (Alternative - may have issues)**

Run this command **ONCE** to populate Firebase with your current SEO settings:

```bash
npm run init-seo
```

Note: If you get errors with the command line approach, use Option A instead.

This will create a document in Firebase at `settings/seo` with all your current SEO data.

### Step 2: Verify Settings in Admin Panel

1. Login to admin panel at `/admin/login`
2. Click on **"🔍 SEO Settings"**
3. Review and update any settings as needed
4. Click **"💾 Save SEO Settings"**

## How It Works

### Database Structure
SEO settings are stored in Firebase Firestore:
```
Collection: settings
Document: seo
Fields:
  - title (string)
  - description (string)
  - keywords (string)
  - schoolName (string)
  - location (string)
  - province (string)
  - city (string)
  - address (string)
  - latitude (string)
  - longitude (string)
  - url (string)
  - ogTitle (string)
  - ogDescription (string)
  - updatedAt (timestamp)
```

### Where SEO Data is Used

1. **Layout.js** (`app/layout.js`)
   - Fetches SEO from Firebase on server-side
   - Generates metadata for `<head>` tags
   - Creates Schema.org structured data

2. **Hero Section** (`components/DynamicHeroSection.jsx`)
   - Fetches SEO from Firebase on client-side
   - Displays location, school name dynamically

3. **Admin Panel** (`app/admin/seo-settings/page.jsx`)
   - Edit interface for all SEO settings
   - Character count indicators
   - Real-time preview

## Updating SEO Settings

### Via Admin Panel (Recommended)
1. Go to `/admin/seo-settings`
2. Edit any field
3. Click "Save"
4. Changes apply immediately

### Via Firebase Console
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Find `settings/seo` document
4. Edit fields directly

## Important Notes

### Geographic Coordinates
Update the latitude and longitude with your **actual** school location:
- Current placeholder: `53.5461, -113.4938`
- Find accurate coordinates: [Google Maps](https://www.google.com/maps)
- Right-click location → Click coordinates to copy

### SEO Best Practices
1. **Title Length**: 50-60 characters (displays character count)
2. **Description Length**: 150-160 characters (displays character count)
3. **Keywords**: Comma-separated, focus on local + relevant terms
4. **Update Regularly**: Keep info current as school changes

### Fallback Behavior
If Firebase fetch fails, the system falls back to default values in:
- `lib/seoServer.js` - Default SEO object

## Files Modified

### New Files
- `scripts/initializeSEO.js` - Initialization script
- `lib/seoServer.js` - Server-side SEO utilities
- `components/DynamicHeroSection.jsx` - Dynamic hero with Firebase data
- `app/admin/seo-settings/page.jsx` - Admin SEO editor

### Modified Files
- `app/layout.js` - Now fetches from Firebase
- `app/page.js` - Uses DynamicHeroSection
- `package.json` - Added init-seo script

## Troubleshooting

### "Cannot find module" error
Make sure you have `"type": "module"` in package.json

### Changes not appearing
1. Check browser cache (hard refresh: Cmd+Shift+R / Ctrl+Shift+R)
2. Verify Firebase data saved correctly
3. Check browser console for errors

### Firebase permission errors
Ensure your Firebase user has read/write permissions to `settings` collection

## Testing

### Test SEO in Search Console
1. Submit URL to [Google Search Console](https://search.google.com/search-console)
2. Use "URL Inspection" tool
3. Verify metadata appears correctly

### Test Open Graph Tags
1. Use [Facebook Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your URL
3. Verify preview displays correctly

### Test Structured Data
1. Use [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your URL
3. Verify Schema.org data is valid

## Support

For issues or questions, check:
- Firebase Console for database errors
- Browser console for JavaScript errors
- Next.js build logs for server errors