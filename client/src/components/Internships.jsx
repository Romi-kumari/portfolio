import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/Section.css';

export default function Internships() {
  const [internshipsData, setInternshipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/internships');
      const data = await response.json();
      setInternshipsData(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
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
          Internships & Training
        </motion.h2>

        {loading ? (
          <p>Loading internships...</p>
        ) : internshipsData.length === 0 ? (
          <p>No internships added yet.</p>
        ) : (
          <div className="timeline">
            {internshipsData.map((internship, index) => (
              <motion.div
                key={internship._id}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{internship.position}</h3>
                  <p className="institution">{internship.companyName}</p>
                  {internship.location && <p className="location">📍 {internship.location}</p>}
                  <p className="date">
                    {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                  </p>
                  {internship.description && <p>{internship.description}</p>}
                  {internship.technologies && internship.technologies.length > 0 && (
                    <div className="tech-tags">
                      {internship.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .timeline-content .location {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 10px;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
        }

        .tech-tag {
          padding: 4px 10px;
          background-color: rgba(255, 107, 157, 0.1);
          border: 1px solid var(--accent);
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--accent);
        }
      `}</style>
    </section>
  );
}
