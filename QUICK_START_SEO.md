# Quick Start - SEO Setup

## ✅ What to Do Now

Since the `npm run init-seo` command had errors, use the **browser-based approach** instead:

### Step 1: Initialize SEO Settings

1. **Login to admin panel:**
   - Go to: `http://localhost:3000/admin/login` (or your deployed URL)
   - Enter your Firebase admin credentials

2. **Initialize SEO data:**
   - Go to: `/admin/initialize-seo`
   - Click **"🚀 Initialize SEO Settings"** button
   - Wait for success message

3. **Edit SEO Settings:**
   - After initialization, click **"Go to SEO Settings"**
   - OR navigate to `/admin/seo-settings`

### Step 2: Update Your Settings

**Important fields to update:**

1. **Geographic Coordinates** (Currently placeholder values!)
   - latitude: `53.5461`
   - longitude: `-113.4938`
   - [Find your actual coordinates on Google Maps](https://www.google.com/maps)

2. **Keywords** - Customize for your target audience

3. **Descriptions** - Keep under 160 characters for best SEO

### Step 3: Verify

After saving:
- Check your homepage - hero section should show your location
- View page source - meta tags should be updated
- Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 🎯 What Was Built

All SEO settings are now **fully editable** from the admin panel:

- ✅ Meta titles and descriptions
- ✅ Keywords
- ✅ School information (name, location, address)
- ✅ Geographic coordinates
- ✅ Open Graph / Social media tags
- ✅ Schema.org structured data

## 📍 Key URLs

- **Admin Dashboard:** `/admin`
- **Initialize SEO:** `/admin/initialize-seo` ⬅️ Start here!
- **Edit SEO:** `/admin/seo-settings`
- **Login:** `/admin/login`

## 🔧 Troubleshooting

**Q: I get "Cannot read settings" error**
- A: You need to initialize first at `/admin/initialize-seo`

**Q: Changes not appearing on homepage**
- A: Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Q: What are the correct coordinates?**
- A: Go to Google Maps, find your school, right-click location, click the coordinates to copy them

---

For detailed documentation, see [SEO_SETUP.md](./SEO_SETUP.md)