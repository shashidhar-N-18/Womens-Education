import React, { useState, useEffect } from 'react';
import './knowledge_center.css';
import LatestNews from './latest_news';
import Blogs from './blogs_news';
import CategoriesVideos from './categories_videos';

const KnowledgeCenter = ({ handlePageChange }) => {
  const [currentPage, setCurrentPage] = useState('home'); // Default page is 'home'
  const [previousPage, setPreviousPage] = useState(null); // To store the previous page

  const handlePageChangeInternal = (page) => {
    setPreviousPage(currentPage); // Store the current page as the previous page
    setCurrentPage(page); // Change to the new page
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [currentPage]);

  return (
    <div className="knowledge-center">
      {/* Conditionally render the header only on the 'home' page */}
      {currentPage === 'home' && (
        <header className="header">
          <h1>Knowledge Center</h1>
          <p>Discover knowledge and resources to empower your learning!</p>
          <button onClick={() => handlePageChange('home')} className="btn">
        Back to Home
      </button>
        </header>
      )}

      {/* Conditionally render main content or page-specific content */}
      {currentPage === 'home' && (
        <main className="main-content">
          <div className="card-row">
            <section className="section">
              <h2>Video Skills</h2>
              <div className="btn-container">
                <p>Enhance your skills with engaging and helpful video tutorials.</p>
                <button
                  onClick={() => handlePageChangeInternal('categories-videos')}
                  className="btn"
                >
                  Go to Videos
                </button>
              </div>
            </section>
            <section className="section">
              <h2>See Latest News</h2>
              <div className="btn-container">
                <p>Stay informed with the latest news about education and skills.</p>
                <button
                  onClick={() => handlePageChangeInternal('latest-news')}
                  className="btn"
                >
                  See News
                </button>
              </div>
            </section>
            <section className="section">
              <h2>Blogs</h2>
              <div className="btn-container">
                <p>Dive into articles and blogs for deeper insights and knowledge.</p>
                <button
                  onClick={() => handlePageChangeInternal('blogs-pg')}
                  className="btn"
                >
                  Explore Blogs
                </button>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Render Categories Videos Page */}
      {currentPage === 'categories-videos' && (
        <div className="categories-videos-page">
          <CategoriesVideos />
        </div>
      )}

      {/* Render Latest News Page */}
      {currentPage === 'latest-news' && (
        <div className="latest-news-page">
          <LatestNews />
        </div>
      )}

      {/* Render Blogs Page */}
      {currentPage === 'blogs-pg' && (
        <div className="blogs-page">
          <Blogs />
        </div>
      )}

      {/* Back to Home from anywhere */}
     
    </div>
  );
};

export default KnowledgeCenter;
