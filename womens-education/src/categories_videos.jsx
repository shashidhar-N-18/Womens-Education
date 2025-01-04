import React, { useState, useEffect } from "react";
import LanguageCourses from "./Language_courses";
import IndustrialCourses from "./Industrial_courses";
import ArtCourses from "./Art_courses";
import "./cat_style.css"; // Import the CSS file

const CategoriesVideos = () => {
  const [currentPage, setCurrentPage] = useState("home"); // Default page is 'home'
  const [previousPage, setPreviousPage] = useState(null); // To store the previous page

  const handlePageChangeInternal = (page) => {
    setPreviousPage(currentPage); // Store the current page as the previous page
    setCurrentPage(page); // Change to the new page
  };

  const handleBackToPrevious = () => {
    setCurrentPage(previousPage || "home"); // Go to the previous page or 'home' if no previous page exists
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [currentPage]);

  return (
    <div className="body">
      {/* Conditionally render the header only on the 'home' page */}
      {currentPage === "home" && (
        <header className="header">
          <h1 className="header-title">Learn New Skills Through Videos</h1>
          <p className="header-text">
            Select a category below and click on the button to get started!
          </p>
        </header>
      )}

      {/* Conditionally render content based on the current page */}
      {currentPage === "home" && (
        <main className="main">
          <section className="skill-category">
            <h2 className="skill-category-title">Language Skills</h2>
            <p className="skill-category-text">
              Learn languages through  videos.
            </p>
            <button
              onClick={() => handlePageChangeInternal("language-courses")}
              className="button"
            >
              Learn Through Videos
            </button>
          </section>

          <section className="skill-category">
            <h2 className="skill-category-title">Industrial Skills</h2>
            <p className="skill-category-text">
              Master industrial skills through  videos.
            </p>
            <button
              onClick={() => handlePageChangeInternal("industrial-courses")}
              className="button"
            >
              Learn Through Videos
            </button>
          </section>

          <section className="skill-category">
            <h2 className="skill-category-title">Art Skills</h2>
            <p className="skill-category-text">
              Enhance your creativity with tutorials.
            </p>
            <button
              onClick={() => handlePageChangeInternal("art-courses")}
              className="button"
            >
              Learn Through Videos
            </button>
          </section>
        </main>
      )}

      {/* Render Language Courses Page */}
      {currentPage === "language-courses" && (
        <div className="language-courses-page">
          <LanguageCourses />
          <button onClick={handleBackToPrevious} className="button">
            Back to Previous
          </button>
        </div>
      )}

      {/* Render Industrial Courses Page */}
      {currentPage === "industrial-courses" && (
        <div className="industrial-courses-page">
          <IndustrialCourses />
          <button onClick={handleBackToPrevious} className="button">
            Back to Previous
          </button>
        </div>
      )}

      {/* Render Art Courses Page */}
      {currentPage === "art-courses" && (
        <div className="art-courses-page">
          <ArtCourses />
          <button onClick={handleBackToPrevious} className="button">
            Back to Previous
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesVideos;
