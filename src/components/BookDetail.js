import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book || !book.volumeInfo) return <p>Book details not available.</p>;

  const { volumeInfo, accessInfo } = book;

  const isDownloadAvailable = accessInfo?.pdf?.isAvailable;
  const downloadLink = accessInfo?.pdf?.acsTokenLink;

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Link to={"/books"}>
          <button
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              alignItems: "right",
              textAlign: "right",
              marginRight: "20px",
              marginTop: "10px",
              padding: "8px",
            }}
          >
            Back
          </button>
        </Link>
      </div>
      <div style={{ padding: "5px 20px", fontFamily: "Arial, sans-serif" }}>
        <h1>{volumeInfo.title}</h1>
        {volumeInfo.imageLinks?.thumbnail && (
          <img
            src={volumeInfo.imageLinks.thumbnail}
            alt={volumeInfo.title}
            style={{ width: "200px", marginBottom: "20px" }}
          />
        )}
        <strong>
          <h3>{volumeInfo.subtitle || ""}</h3>
        </strong>
        <p>
          <strong>Authors:</strong>{" "}
          {volumeInfo.authors?.join(", ") || "Unknown"}
        </p>
        <p>
          <strong>Publisher:</strong> {volumeInfo.publisher || "Unknown"}
        </p>
        <p>
          <strong>Published Date:</strong>{" "}
          {volumeInfo.publishedDate || "Unknown"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {volumeInfo.description || "No description available."}
        </p>

        {isDownloadAvailable && downloadLink ? (
          <div>
            <h4>Download or View the Book:</h4>
            <button
              onClick={() => window.open(downloadLink, "_blank")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Download PDF
            </button>
            {/* <button
            onClick={() => window.open(downloadLink, "_blank")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View PDF
          </button> */}
          </div>
        ) : (
          <p>This book is not available for download.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
