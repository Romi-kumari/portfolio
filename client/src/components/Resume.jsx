import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/Section.css';

export default function Resume() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resume');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setResumeData(data[0]);
      } else if (!Array.isArray(data)) {
        setResumeData(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Resume
        </motion.h2>

        {loading ? (
          <p>Loading resume...</p>
        ) : resumeData ? (
          <motion.div
            className="resume-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>{resumeData.title}</h3>
            {resumeData.description && <p>{resumeData.description}</p>}
            {resumeData.fileUrl && (
              <a href={resumeData.fileUrl} download className="download-btn">
                Download CV
              </a>
            )}
          </motion.div>
        ) : (
          <p>No resume available.</p>
        )}
      </div>

      <style>{`
        .resume-container {
          background-color: var(--secondary);
          padding: 40px;
          border-radius: 12px;
          border: 1px solid var(--border);
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .resume-container h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .resume-container p {
          margin-bottom: 30px;
          font-size: 1.05rem;
        }

        .download-btn {
          display: inline-block;
          padding: 15px 40px;
          background-color: var(--accent);
          color: white;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .download-btn:hover {
          background-color: var(--accent-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 107, 157, 0.3);
        }
      `}</style>
    </section>
  );
}
