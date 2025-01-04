import React, { useState, useEffect } from 'react';
import './Appmodule.css';
import KnowledgeCenter from './knowledge_center';
import HelpandSupport from './help_support'; // Assuming it's in the same folder

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Default page is 'home'

  // Function to switch pages
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Scroll to top when the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div>
      {/* Home Page */}
      {currentPage === 'home' && (
        <div className="home-page">
          <header className="hero">
            <div className="container spacing">
              <h1 className="primary-title">Empowering Women Through Education</h1>
              <p>
                Join our platform to access resources, courses, and a supportive
                community. Together, let’s shape your future.
              </p>
              <button onClick={() => handlePageChange('knowledge-center')} className="btn">
                Get Started
              </button>
            </div>
          </header>

          <main>
            <section className="split">
              <div
                className="help-support"
                onClick={() => handlePageChange('help-support')}
              >
                <h2 className="section-title">Help and Support</h2>
                <p>
                  Need assistance? Reach out to us via our live chat or 24/7 helpline.
                  We’re here to help you succeed.
                </p>
                <button className="btn">Connect Now</button>
              </div>

              <div
                className="knowledge-center"
                onClick={() => handlePageChange('knowledge-center')}
              >
                <h2 className="section-title">Knowledge Center</h2>
                <p>
                  Access blogs, videos, and News resources to enhance your learning
                  journey!
                </p>
                <button className="btn">Connect Now</button>
              </div>

              <div className="community">
                <h2 className="section-title">Education Portal</h2>
                <p>Check out the National Education Portal</p>
                <a
                  href="https://www.india.gov.in/topics/education"
                  target="_blank"
                  className="btn"
                  rel="noopener noreferrer"
                >
                  Visit now
                </a>
              </div>
            </section>
          </main>
        </div>
      )}

      {/* Knowledge Center Page */}
      {currentPage === 'knowledge-center' && (
        <div className="knowledge-center-page">
          <KnowledgeCenter handlePageChange={handlePageChange} />
        </div>
      )}

      {/* Help and Support Page */}
      {currentPage === 'help-support' && (
        <div className="help-support-page">
          <HelpandSupport handlePageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}

export default App;
