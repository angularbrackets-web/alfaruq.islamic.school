'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    meta_description: '',
    meta_keywords: '',
    template: 'standard',
    status: 'draft',
    is_reusable: false
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert('Page created successfully!');
        router.push(`/admin/cms/pages/${data.id}/edit`);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      // Auto-generate slug from title if slug is empty
      slug: prev.slug === '' ? title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') : prev.slug
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Page</h1>
          <p className="text-gray-600">Add a new page to your website</p>
        </div>
        <Link
          href="/admin/cms/pages"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Pages
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Page Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="About Us"
          />
          <p className="text-xs text-gray-500 mt-1">
            The main title of your page
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL Slug *</label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">/</span>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
              className="flex-1 border rounded px-3 py-2 font-mono"
              placeholder="about-us"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            URL-friendly version of the title. Use lowercase letters, numbers, and hyphens only.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Template</label>
            <select
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="standard">Standard</option>
              <option value="landing">Landing Page</option>
              <option value="gallery">Gallery</option>
              <option value="full_width">Full Width</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Initial Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="A brief description of this page for search engines..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended: 150-160 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Keywords</label>
          <input
            type="text"
            value={formData.meta_keywords}
            onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated keywords for SEO
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.is_reusable}
              onChange={(e) => setFormData({ ...formData, is_reusable: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium">Make this page reusable</span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Reusable pages can be embedded as components in other pages
          </p>
        </div>

        <div className="flex space-x-2 pt-4 border-t">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitting ? 'Creating...' : 'Create Page'}
          </button>
          <Link
            href="/admin/cms/pages"
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
