'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PagesManagement() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPages();
  }, [statusFilter]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      let url = '/api/pages';
      const params = new URLSearchParams();

      if (statusFilter) params.append('status', statusFilter);

      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setPages(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        await fetchPages();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await fetch(`/api/pages/${id}?action=duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const data = await res.json();

      if (data.success) {
        await fetchPages();
        alert('Page duplicated successfully!');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const togglePublish = async (page) => {
    try {
      const newStatus = page.status === 'published' ? 'draft' : 'published';

      const res = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (data.success) {
        await fetchPages();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredPages = pages.filter(page => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      page.title?.toLowerCase().includes(term) ||
      page.slug?.toLowerCase().includes(term) ||
      page.meta_description?.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (status) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${styles[status] || styles.draft}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div className="p-8">Loading pages...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pages Management</h1>
          <p className="text-gray-600">Create and manage your website pages</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/admin/cms/pages/new"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create New Page
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, slug, or description..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Showing {filteredPages.length} of {pages.length} pages
        </p>
      </div>

      {/* Pages Grid */}
      {filteredPages.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-lg">
          <p className="text-gray-500 mb-4">
            {pages.length === 0 ? 'No pages yet. Create your first page!' : 'No pages match your search criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPages.map(page => (
            <div key={page.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg truncate flex-1">{page.title}</h3>
                {getStatusBadge(page.status)}
              </div>

              <p className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded mb-2">
                /{page.slug}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                Template: <span className="font-medium">{page.template}</span>
              </p>

              {page.meta_description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {page.meta_description}
                </p>
              )}

              <p className="text-xs text-gray-400 mb-3">
                Updated: {new Date(page.updated_at).toLocaleDateString()}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => togglePublish(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    page.status === 'published'
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {page.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>

                <Link
                  href={`/admin/cms/pages/${page.id}/edit`}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDuplicate(page.id)}
                  className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  Duplicate
                </button>

                <button
                  onClick={() => handleDelete(page.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
