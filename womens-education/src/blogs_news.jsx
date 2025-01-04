import React, { useState, useEffect } from 'react';
import './style_blogs.css';

const Blogs = () => {
  const [colors, setColors] = useState([
    '#ff1493', '#ff69b4', '#ff6347', '#ff4500', '#ff8c00', '#ffb6c1', '#ff00ff',
  ]);

  const blogLinks = [
    { title: 'Empowering Women in Technology', link: 'https://www.womentech.net' },
    { title: 'Breaking Barriers: Women in STEM', link: 'https://www.ingeniouswomen.com' },
    { title: 'Leadership Development for Women', link: 'https://www.forbes.com/leadership/women-in-leadership' },
    { title: 'Achieving Work-Life Balance as a Woman', link: 'https://www.theladders.com/career-advice/work-life-balance' },
    { title: 'Financial Independence for Women', link: 'https://www.shefinance.com' },
    { title: 'Digital Literacy for Women', link: 'https://www.digitalfutures.org' },
    { title: 'Mental Health and Well-being for Women', link: 'https://www.psychologytoday.com/us/topics/womens-health' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prevColors) => {
        const newColors = [...prevColors];
        newColors.sort(() => Math.random() - 0.5); // Shuffle the colors
        return newColors;
      });
    }, 2000); // Change color every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="blog-section">
      <h1 className="section-title">Blogs for New Gen Women</h1>
      <div className="button-container">
        {blogLinks.map((blog, index) => (
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="button-link"
            style={{ backgroundColor: colors[index % colors.length] }}
            key={index}
          >
            {blog.title}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
