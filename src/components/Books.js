import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          searchQuery || "fiction"
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.items || []);
      console.log(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("");
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      fetchBooks("");
    } else {
      fetchBooks(e.target.value);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Book Finder</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for books..."
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {books.map((book) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    backgroundColor: "#f0f0f0",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                  }}
                >
                  No Image
                </div>
              )}
              <h3
                style={{
                  fontSize: "16px",
                  margin: "0 0 10px 0",
                  color: "#333",
                }}
              >
                {book.volumeInfo.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Books;
