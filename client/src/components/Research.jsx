import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import './styles/Section.css';

export default function Research() {
  const [researchData, setResearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/research');
      const data = await response.json();
      setResearchData(data);
    } catch (error) {
      console.error('Error fetching research:', error);
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
          Research & Publications
        </motion.h2>

        {loading ? (
          <p>Loading research...</p>
        ) : researchData.length === 0 ? (
          <p>No research papers added yet.</p>
        ) : (
          <motion.div
            className="grid-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {researchData.map((paper) => (
              <motion.div
                key={paper._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card
                  title={paper.title}
                  subtitle={paper.journal}
                  description={paper.description}
                  link={paper.link}
                >
                  <div style={{ marginTop: '15px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Authors: {paper.authors.join(', ')}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
                      {paper.category}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
