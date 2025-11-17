'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NavigationManagement() {
  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    label_en: '',
    href: '',
    level: 1,
    parent_id: '',
    display_order: 0,
    is_visible: true
  });

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/navigation?tree=true');
      const data = await res.json();
      if (data.success) {
        setNavigation(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/navigation/${editingItem.id}` : '/api/navigation';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        await fetchNavigation();
        resetForm();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      label_en: item.label_en,
      href: item.href,
      level: item.level,
      parent_id: item.parent_id || '',
      display_order: item.display_order,
      is_visible: item.is_visible
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure? This will delete all sub-items too.')) return;

    try {
      const res = await fetch(`/api/navigation/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        await fetchNavigation();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const res = await fetch(`/api/navigation/${id}?action=toggle_visibility`, {
        method: 'PUT'
      });

      const data = await res.json();

      if (data.success) {
        await fetchNavigation();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      label_en: '',
      href: '',
      level: 1,
      parent_id: '',
      display_order: 0,
      is_visible: true
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const renderNavigationItem = (item) => (
    <div key={item.id} className="border rounded-lg p-4 mb-2 bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.label_en}</h3>
          <p className="text-sm text-gray-600">
            {item.href} • Level {item.level} • Order: {item.display_order}
          </p>
          {item.is_visible ? (
            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mt-1">
              Visible
            </span>
          ) : (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mt-1">
              Hidden
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleVisibility(item.id)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {item.is_visible ? 'Hide' : 'Show'}
          </button>
          <button
            onClick={() => handleEdit(item)}
            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Render children */}
      {item.children && item.children.length > 0 && (
        <div className="ml-6 mt-3 border-l-2 border-gray-200 pl-4">
          {item.children.map(child => (
            <div key={child.id} className="mb-2 p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{child.label_en}</h4>
                  <p className="text-sm text-gray-600">{child.href}</p>
                  {child.is_visible ? (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mt-1">
                      Visible
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mt-1">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleVisibility(child.id)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {child.is_visible ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleEdit(child)}
                    className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(child.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
  );

  if (loading) return <div className="p-8">Loading navigation...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Navigation Management</h1>
          <p className="text-gray-600">Manage your website navigation menu</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {showForm ? 'Cancel' : 'Add Navigation Item'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.label_en}
                  onChange={(e) => setFormData({ ...formData, label_en: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="About Us"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL/Href *</label>
                <input
                  type="text"
                  required
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="/about or https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Level *</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value={1}>Level 1 (Top Menu)</option>
                  <option value={2}>Level 2 (Sub Menu)</option>
                </select>
              </div>

              {formData.level === 2 && (
                <div>
                  <label className="block text-sm font-medium mb-1">Parent Item *</label>
                  <select
                    required
                    value={formData.parent_id}
                    onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Parent</option>
                    {navigation.map(item => (
                      <option key={item.id} value={item.id}>{item.label_en}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    checked={formData.is_visible}
                    onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Visible to users</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editingItem ? 'Update' : 'Create'} Navigation Item
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {navigation.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No navigation items yet. Click "Add Navigation Item" to get started.
          </p>
        ) : (
          navigation.map(item => renderNavigationItem(item))
        )}
      </div>
    </div>
  );
}
