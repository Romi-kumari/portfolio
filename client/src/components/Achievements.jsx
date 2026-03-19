import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/Section.css';

export default function Achievements() {
  const [achievementsData, setAchievementsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/achievements');
      const data = await response.json();
      setAchievementsData(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
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
          Achievements
        </motion.h2>

        {loading ? (
          <p>Loading achievements...</p>
        ) : achievementsData.length === 0 ? (
          <p>No achievements added yet.</p>
        ) : (
          <div className="grid-2">
            {achievementsData.map((achievement, index) => (
              <motion.div
                key={achievement._id}
                className="achievement-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="achievement-icon">{achievement.category === 'Award' ? '🏆' : '⭐'}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <p className="date">
                  {new Date(achievement.achievementDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .achievement-card {
          background-color: var(--secondary);
          padding: 30px;
          border-radius: 12px;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
          text-align: center;
        }

        .achievement-card:hover {
          border-color: var(--accent);
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.1);
          transform: translateY(-5px);
        }

        .achievement-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .achievement-card h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .achievement-card .date {
          color: var(--accent);
          font-size: 0.9rem;
          margin-top: 15px;
        }
      `}</style>
    </section>
  );
}
