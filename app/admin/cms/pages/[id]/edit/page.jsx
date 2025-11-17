'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState(false);

  useEffect(() => {
    fetchPageAndBlocks();
  }, [params.id]);

  const fetchPageAndBlocks = async () => {
    try {
      setLoading(true);
      const [pageRes, blocksRes] = await Promise.all([
        fetch(`/api/pages/${params.id}`),
        fetch(`/api/blocks?page_id=${params.id}`)
      ]);

      const pageData = await pageRes.json();
      const blocksData = await blocksRes.json();

      if (pageData.success) setPage(pageData.data);
      if (blocksData.success) setBlocks(blocksData.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageUpdate = async (updates) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/pages/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      const data = await res.json();

      if (data.success) {
        setPage({ ...page, ...updates });
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddBlock = async (blockType) => {
    try {
      const res = await fetch('/api/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: params.id,
          block_type: blockType
        })
      });

      const data = await res.json();

      if (data.success) {
        await fetchPageAndBlocks();
        setShowAddBlock(false);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteBlock = async (blockId) => {
    if (!confirm('Delete this block?')) return;

    try {
      const res = await fetch(`/api/blocks/${blockId}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (data.success) {
        await fetchPageAndBlocks();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleBlockVisibility = async (blockId) => {
    try {
      const res = await fetch(`/api/blocks/${blockId}?action=toggle_visibility`, {
        method: 'PUT'
      });

      const data = await res.json();

      if (data.success) {
        await fetchPageAndBlocks();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const blockTypes = [
    { value: 'text', label: 'Text', icon: '📝' },
    { value: 'image', label: 'Image', icon: '🖼️' },
    { value: 'video', label: 'Video', icon: '🎥' },
    { value: 'hero', label: 'Hero', icon: '🦸' },
    { value: 'card', label: 'Card', icon: '🃏' },
    { value: 'cards_grid', label: 'Cards Grid', icon: '▦' },
    { value: 'cta', label: 'Call to Action', icon: '📢' },
    { value: 'section', label: 'Section', icon: '📦' },
    { value: 'columns', label: 'Columns', icon: '▥' },
    { value: 'divider', label: 'Divider', icon: '➖' },
    { value: 'spacer', label: 'Spacer', icon: '⬜' }
  ];

  if (loading) return <div className="p-8">Loading...</div>;
  if (!page) return <div className="p-8">Page not found</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Page: {page.title}</h1>
          <p className="text-gray-600">/{page.slug}</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/cms/pages"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Pages
          </Link>
          <button
            onClick={() => handlePageUpdate({ status: page.status === 'published' ? 'draft' : 'published' })}
            disabled={saving}
            className={`px-4 py-2 rounded ${
              page.status === 'published'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {page.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Page Settings */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Page Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              onBlur={() => handlePageUpdate({ title: page.title })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Template</label>
            <select
              value={page.template}
              onChange={(e) => handlePageUpdate({ template: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="standard">Standard</option>
              <option value="landing">Landing Page</option>
              <option value="gallery">Gallery</option>
              <option value="full_width">Full Width</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Content Blocks</h2>
          <button
            onClick={() => setShowAddBlock(!showAddBlock)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showAddBlock ? 'Cancel' : 'Add Block'}
          </button>
        </div>

        {showAddBlock && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-3">Select Block Type</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {blockTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => handleAddBlock(type.value)}
                  className="p-3 bg-white border rounded hover:bg-blue-50 hover:border-blue-500 text-center"
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-xs font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {blocks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No content blocks yet. Click "Add Block" to start building your page.
          </p>
        ) : (
          <div className="space-y-3">
            {blocks.map(block => (
              <div
                key={block.id}
                className={`border rounded-lg p-4 ${block.is_visible ? 'bg-white' : 'bg-gray-50 opacity-60'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {block.block_type}
                      </span>
                      {!block.is_visible && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    <pre className="text-sm text-gray-600 bg-gray-50 p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(block.content, null, 2)}
                    </pre>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleBlockVisibility(block.id)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      {block.is_visible ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => handleDeleteBlock(block.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is a basic block management interface. Full block editors with
          content editing will be available in the next update. For now, you can add, delete, and toggle
          visibility of blocks. To edit block content, you can use the API directly or wait for the
          enhanced editor UI.
        </p>
      </div>
    </div>
  );
}
