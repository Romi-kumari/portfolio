import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/AboutMe.css';

export default function AboutMe() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/aboutme');
      const data = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {aboutData?.profileImage && (
              <img src={aboutData.profileImage} alt="Profile" />
            )}
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {aboutData ? (
              <>
                <h3>{aboutData.title}</h3>
                <p>{aboutData.bio}</p>
                {aboutData.location && (
                  <p className="location">📍 {aboutData.location}</p>
                )}
              </>
            ) : (
              <p>Loading about information...</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
