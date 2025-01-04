import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const Header = styled.header`
  background-color: #ff1493;
  color: white;
  text-align: center;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 2rem;
  padding : 12px;
`;

const Button = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1493;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const VideoPlayer = styled.div`
  width: 100%;
  max-width: 800px;
  display: none;
  position: relative;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff1493;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #ff69b4;
  }
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

const VideoCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const VideoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const VideoTitle = styled.h3`
  margin: 15px 0;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const VideoDescription = styled.p`
  font-size: 1rem;
  color: #666;
  padding: 0 15px 15px;
`;

// ArtCourses Component
const ArtCourses = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const API_KEY = "AIzaSyCDOUzzSBmULk6bP807xS02WB2oWRH0hsE";
  const BASE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=${API_KEY}`;

  const buttons = {
    "drawing-btn": "drawingtutorials",
    "dancing-btn": "dancingtutorials",
    "singing-btn": "singingtutorials",
  };

  useEffect(() => {
    const fetchVideos = (keyword) => {
      fetch(`${BASE_URL}&q=${keyword}`)
        .then((response) => response.json())
        .then((data) => setVideos(data.items))
        .catch((error) => console.error("Error fetching videos:", error));
    };

    Object.entries(buttons).forEach(([buttonId, keyword]) => {
      document.getElementById(buttonId).addEventListener("click", () => fetchVideos(keyword));
    });

    // Cleanup event listeners
    return () => {
      Object.keys(buttons).forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        if (button) {
          button.removeEventListener("click", () => fetchVideos(buttons[buttonId]));
        }
      });
    };
  }, []);

  const playVideo = (videoId) => {
    setCurrentVideo(videoId);
  };

  const closePlayer = () => {
    setCurrentVideo(null);
  };

  return (
    <div>
      <Header>
        <h1>Learning Art Skills</h1>
        <p>Select an art category and explore video tutorials!</p>
      </Header>
      <ButtonGroup>
        <Button id="drawing-btn">Drawing Tutorials</Button>
        <Button id="dancing-btn">Dancing Tutorials</Button>
        <Button id="singing-btn">Singing Tutorials</Button>
      </ButtonGroup>
      <main>
        <VideoContainer>
          {currentVideo && (
            <VideoPlayer>
              <Iframe
                src={`https://www.youtube.com/embed/${currentVideo}`}
                frameBorder="0"
                allowFullScreen
              />
              <CloseButton onClick={closePlayer}>Close</CloseButton>
            </VideoPlayer>
          )}
          <VideosGrid>
            {videos.map((video) => {
              const { videoId } = video.id;
              const { title, description, thumbnails } = video.snippet;
              return (
                <VideoCard key={videoId} onClick={() => playVideo(videoId)}>
                  <VideoImage src={thumbnails.high.url} alt={title} />
                  <VideoTitle>{title}</VideoTitle>
                  <VideoDescription>{description.substring(0, 100)}...</VideoDescription>
                </VideoCard>
              );
            })}
          </VideosGrid>
        </VideoContainer>
      </main>
    </div>
  );
};

export default ArtCourses;
