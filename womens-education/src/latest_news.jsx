import React, { useState, useEffect } from "react";
import './latest-news.css';

const LatestNews = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const fetchNews = (type) => {
    const url = `http://127.0.0.1:5000/scrape_news/${type}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.data, type);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
      });
  };

  const displayNews = (newsData, type) => {
    setModalTitle(type === 'school' ? "School Education News" : "Karnataka State Women’s Development Corporation News");
    setNewsData(newsData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Check if modal is visible and manage events accordingly
    if (modalVisible) {
      // You can add any extra DOM interaction here if needed
    }
  }, [modalVisible]);

  return (
    <div>
      <header className="header">
        <h1>Latest Education News</h1>
        <p>Stay updated with the latest school and higher education news!</p>
      </header>

      <main>
        <section className="news-category">
          <h2>School Education News</h2>
          <button onClick={() => fetchNews('school')} id="school-news-btn" className="btn">
            Get Latest School News
          </button>
        </section>

        <section className="news-category">
          <h2>Karnataka State Women’s Development Corporation News</h2>
          <button onClick={() => fetchNews('higher')} id="higher-news-btn" className="btn">
            Get Latest News
          </button>
        </section>
      </main>

      {/* News Pop-up Modal */}
      {modalVisible && (
        <div id="news-modal" className="modal" style={{ display: modalVisible ? 'flex' : 'none' }}>
          <div className="modal-content">
            <span onClick={closeModal} id="close-modal" className="close-btn">
              &times;
            </span>
            <h3 id="modal-title">{modalTitle}</h3>
            <div id="news-details">
              {newsData.length === 0 ? (
                <p>No news available at the moment.</p>
              ) : (
                newsData.map((news, index) => (
                  <div key={index} className="news-item">
                    <li>
                      <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                    </li>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
