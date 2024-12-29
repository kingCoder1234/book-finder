import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import BookDetail from "./components/BookDetail";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
