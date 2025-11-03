import React, { useState, useEffect } from "react";

export default function BookFinder() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const [filterYear, setFilterYear] = useState("");
  const [searchMode, setSearchMode] = useState("title");

  async function doSearch(newPage = 1) {
    if (!query.trim()) {
      setError("Please enter a search term (title or author).");
      setResults([]);
      setNumFound(0);
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setNumFound(0);
    setPage(newPage);

    try {
      const q = encodeURIComponent(query.trim());
      const endpoint = `https://openlibrary.org/search.json?${searchMode}=${q}&page=${newPage}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setNumFound(data.numFound || 0);
      let docs = data.docs || [];
      if (filterYear) {
        docs = docs.filter(
          (d) =>
            d.first_publish_year &&
            String(d.first_publish_year).startsWith(filterYear)
        );
      }
      setResults(docs);
      if ((data.docs || []).length === 0) setError("No results found.");
    } catch (err) {
      setError("Network error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  function coverUrl(doc) {
    if (doc.cover_i)
      return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
    if (doc.isbn && doc.isbn.length > 0)
      return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
    return null;
  }

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 20,
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <h1>Book Finder — for Alex</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <input
          placeholder={
            searchMode === "title" ? "Enter book title" : "Enter author name"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px 10px", minWidth: 280 }}
        />
        <button onClick={() => doSearch(1)} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && (
        <div
          style={{
            background: "#ffecec",
            border: "1px solid #ffcccc",
            padding: 10,
          }}
        >
          {error}
        </div>
      )}
      <div>
        <strong>Found:</strong> {numFound} results
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {results.map((doc) => (
          <div
            key={doc.key}
            style={{ border: "1px solid #ddd", padding: 10, borderRadius: 8 }}
          >
            {coverUrl(doc) ? (
              <img
                src={coverUrl(doc)}
                alt={doc.title}
                style={{ width: "100%" }}
              />
            ) : (
              <div>No Image</div>
            )}
            <h3>{doc.title}</h3>
            <p>{(doc.author_name || []).join(", ")}</p>
            <small>{doc.first_publish_year}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function BookFinder() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const [filterYear, setFilterYear] = useState('');
  const [searchMode, setSearchMode] = useState('title');

  async function doSearch(newPage = 1) {
    if (!query.trim()) {
      setError('Please enter a search term (title or author).');
      setResults([]);
      setNumFound(0);
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setNumFound(0);
    setPage(newPage);

    try {
      const q = encodeURIComponent(query.trim());
      const endpoint = `https://openlibrary.org/search.json?${searchMode}=${q}&page=${newPage}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setNumFound(data.numFound || 0);
      let docs = data.docs || [];
      if (filterYear) {
        docs = docs.filter((d) => d.first_publish_year && String(d.first_publish_year).startsWith(filterYear));
      }
      setResults(docs);
      if ((data.docs || []).length === 0) setError('No results found.');
    } catch (err) {
      setError('Network error. Check console.');
    } finally {
      setLoading(false);
    }
  }

  function coverUrl(doc) {
    if (doc.cover_i) return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
    if (doc.isbn && doc.isbn.length > 0) return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
    return null;
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 20, maxWidth: 1000, margin: '0 auto' }}>
      <h1>Book Finder — for Alex</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <select value={searchMode} onChange={(e) => setSearchMode(e.target.value)}>
          <option value="title">Title__</option>
          <option value="author">Author__</option>
        </select>
        <input
          placeholder={searchMode === 'title' ? 'Enter book title' : 'Enter author name'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 10px', minWidth: 280 }}
        />
        <button onClick={() => doSearch(1)} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div style={{ background: '#ffecec', border: '1px solid #ffcccc', padding: 10 }}>{error}</div>}
      <div><strong>Found:</strong> {numFound} results</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {results.map((doc) => (
          <div key={doc.key} style={{ border: '1px solid #ddd', padding: 10, borderRadius: 8 }}>
            {coverUrl(doc) ? <img src={coverUrl(doc)} alt={doc.title} style={{ width: '100%' }} /> : <div>No Image</div>}
            <h3>{doc.title}</h3>
            <p>{(doc.author_name || []).join(', ')}</p>
            <small>{doc.first_publish_year}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
