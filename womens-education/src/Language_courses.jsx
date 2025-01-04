import React, { useEffect } from "react";

const LanguageCourses = () => {
  useEffect(() => {
    const API_KEY = "AIzaSyCDOUzzSBmULk6bP807xS02WB2oWRH0hsE";
    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=${API_KEY}`;

    const buttons = {
      "english-course-btn": "englishcoursekannada",
      "computer-course-btn": "computercourseinkannada",
      "hindi-course-btn": "learnhindithroughkannada",
    };

    const videosDiv = document.getElementById("videos");
    const playerDiv = document.getElementById("player");
    const iframe = document.getElementById("youtube-iframe");
    const closePlayerBtn = document.getElementById("close-player");

    Object.entries(buttons).forEach(([buttonId, keyword]) => {
      document.getElementById(buttonId).addEventListener("click", () => fetchVideos(keyword));
    });

    function fetchVideos(keyword) {
      fetch(`${BASE_URL}&q=${keyword}`)
        .then((response) => response.json())
        .then((data) => displayVideos(data.items))
        .catch((error) => console.error("Error fetching videos:", error));
    }

    function displayVideos(videos) {
      videosDiv.innerHTML = ""; // Clear previous videos
      videos.forEach((video) => {
        const { videoId } = video.id;
        const { title, description, thumbnails } = video.snippet;

        const videoCard = document.createElement("div");
        videoCard.className = "video-card";
        videoCard.innerHTML = ` 
          <img src="${thumbnails.high.url}" alt="${title}">
          <h3>${title}</h3>
          <p>${description.substring(0, 100)}...</p>
        `;

        videoCard.addEventListener("click", () => playVideo(videoId));
        videosDiv.appendChild(videoCard);
      });
    }

    function playVideo(videoId) {
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      playerDiv.style.display = "block";
    }

    closePlayerBtn.addEventListener("click", () => {
      playerDiv.style.display = "none";
      iframe.src = ""; // Stop video playback
    });
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Learning With Videos</h1>
        <p>Select a topic and enjoy learning videos!</p>
      </header>
      <div className="button-group">
        <button id="english-course-btn" className="btn">English Course in Kannada</button>
        <button id="computer-course-btn" className="btn">Basic Computer Course in Kannada</button>
        <button id="hindi-course-btn" className="btn">Learn Hindi Through Kannada</button>
      </div>
      <main>
        <div className="video-container">
          <div id="player" className="video-player">
            <iframe id="youtube-iframe" src="" frameBorder="0" allowFullScreen></iframe>
            <button id="close-player" className="close-btn">Close</button>
          </div>
          <div id="videos" className="videos-grid"></div>
        </div>
      </main>

      {/* Inline CSS */}
      <style>{`
        /* Main Body Style */
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f0f8ff;
          color: #333;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Header Style */
        .header {
          background-color: #ff1493;  
          color: white;
          text-align: center;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
        }

        .header p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
        }

        /* Button Group Style */
        .button-group {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .button-group .btn {
          background-color: #ff69b4;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: bold;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button-group .btn:hover {
          background-color: #ff1493;
        }

        /* Video Container Styles */
        .video-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
        }

        .video-player {
             display: none;
              margin-bottom: 2rem;
              position: relative;
              width: 700px;
        }

        #youtube-iframe {
          width: 100%;
          height: 400px;
          border: none;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #ff1493;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .close-btn:hover {
          background-color: #ff69b4;
        }

        /* Video Grid Style */
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          width: 100%;
          margin-top: 2rem;
        }

        .video-card {
          background-color: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .video-card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .video-card h3 {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }

        .video-card p {
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default LanguageCourses;
