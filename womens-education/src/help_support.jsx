import React, { useEffect, useState } from "react";
import './styles_support.css';

const KnowledgeCenter = ({ handlePageChange }) => {
  const [currentPage, setCurrentPage] = useState('helpAndSupport'); // Set the initial page to 'helpAndSupport'

  const handlePageChangeInternal = (page) => {
    setCurrentPage(page); // Change to the new page
    handlePageChange(page); // Call the parent function for page change
  };

  const HelpAndSupport = () => {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on mount
    }, []);

    return (
      <div className="help-support">
        <header className="header">
          {/* Back to Home Button */}
          <h1 className="section-title-help">Contact Information</h1>
          <p>Reach out to the one you need in a click!</p>
          <button
            onClick={() => handlePageChangeInternal('home')}
            className="btn"
          >
            Back to Home
          </button>
        </header>

        <div className="split-help">
          <div>
            <h3>Sri. Syprin Montheiro</h3>
            <p>Director of Public Instructions (Primary Education)</p>
            <p>Phone: +91-080-22210117</p>
            <p>Fax: +91-080-22211086</p>
            <p>Email: <a href="mailto:prydirector.edu.sgkar@kar.nic.in">Mail-Syprin Montheiro </a></p>
          </div>
          <div>
            <h3>M D Usha</h3>
            <p>Deputy Director (Primary Education)</p>
            <p>Phone: +91-080-22220799</p>
            <p>Fax: +91-080-22211086</p>
            <p>Email: <a href="mailto:ddpiprimary.edu.sgkar@kar.nic.in">Mail-M D Usha</a></p>
          </div>
          <div>
            <h3>Almas Parveen Taj</h3>
            <p>Senior Assistant Director (Primary Education)</p>
            <p>Phone: +91-080-22214352</p>
            <p>Fax: +91-080-22211086</p>
            <p>Email: <a href="mailto:sogia-pry.edu.sgkar@nic.in">Mail-Almas Parveen Taj</a></p>
          </div>
        </div>

        <div className="btn-container">
          <a
            href="https://schooleducation.karnataka.gov.in/246/contact-us/en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Contact Us Online
          </a>
        </div>
      </div>
    );
  };

  return <HelpAndSupport />;
};

export default KnowledgeCenter;
