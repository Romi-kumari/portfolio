import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import './styles/Section.css';

export default function Hackathons() {
  const [hackathonsData, setHackathonsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hackathons');
      const data = await response.json();
      setHackathonsData(data);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
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
          Hackathons
        </motion.h2>

        {loading ? (
          <p>Loading hackathons...</p>
        ) : hackathonsData.length === 0 ? (
          <p>No hackathons added yet.</p>
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
            {hackathonsData.map((hackathon) => (
              <motion.div
                key={hackathon._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card
                  title={hackathon.eventName}
                  subtitle={hackathon.position}
                  description={hackathon.description}
                  technologies={hackathon.technologies}
                  link={hackathon.link}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
