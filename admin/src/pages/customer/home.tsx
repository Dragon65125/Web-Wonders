import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vendors/HomePage.css'; // Ensure your CSS file is correctly imported

const productImages: string[] = [
  '/images/s1.webp',
  '/images/s2.webp',
  '/images/s3.webp',
  '/images/s4.webp',
  '/images/s5.jpg',
  '/images/s8.jpg',
  '/images/s9.jpg',
  '/images/s11.jpg',
  '/images/s12.jpg',
  '/images/s13.jpg',
  '/images/s14.jpg',
  '/images/s15.jpg',
  '/images/s16.jpg',
  '/images/s17.jpg',
  '/images/s18.jpg',
  '/images/s19.jpg',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState<string>('/images/s1.webp');
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true); // State to manage hero-overlay visibility

  useEffect(() => {
    // Change background image every 2 seconds
    const imageChangeInterval = setInterval(() => {
      const newImage = productImages[Math.floor(Math.random() * productImages.length)];
      setBackgroundImage(newImage);
    }, 2000); // Change every 2 seconds

    // Set timeout to hide hero-overlay after 4 seconds
    const hideOverlayTimeout = setTimeout(() => {
      setOverlayVisible(false);
    }, 3000); // 3 seconds

    return () => {
      clearInterval(imageChangeInterval); // Cleanup interval on component unmount
      clearTimeout(hideOverlayTimeout); // Cleanup timeout on component unmount
    };
  }, []);

  const handleExploreClick = () => {
    navigate('/products');
  };

  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div 
          className="background-image" 
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'object-cover', // Ensures the image covers the container
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents repeating the image
            width: '100%', // Adjust as needed
            height: '100vh' // Adjust as needed
          }} 
        />
        {overlayVisible && (
          <div className="hero-overlay">
            <h1 className="hero-title">Welcome to Web-Wonders</h1>
            <p className="hero-subtitle">Discover amazing products!!!</p>
            <button className="cta-button" onClick={handleExploreClick}>
              Explore Now
            </button>
          </div>
        )}
      </div>
      <section 
        className="info-section" 
        style={{
          backgroundImage: 'url("./images/banner.jpg")', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '20px', // Optional: adjusts padding
          color: '#fff' // Optional: sets text color for better contrast
        }}
      >
        <h2>Why Choose Us?</h2>
        <div className="info-cards">
          <div 
            className="info-card" 
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
              padding: '10px', // Adjust padding as needed
              borderRadius: '8px' // Optional: rounded corners
            }}
          >
            <h3>Quality Products</h3>
            <p>We offer high-quality products to meet your needs.</p>
          </div>
          <div 
            className="info-card" 
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
              padding: '10px', // Adjust padding as needed
              borderRadius: '8px' // Optional: rounded corners
            }}
          >
            <h3>Great Deals</h3>
            <p>Find the best deals and discounts in our store.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
