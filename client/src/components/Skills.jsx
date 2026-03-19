import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/Skills.css';

export default function Skills() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skills');
      const data = await response.json();
      setSkillsData(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>

        {loading ? (
          <p>Loading skills...</p>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div className="skills-grid">
            {Object.entries(groupedSkills).map(([category, skills], idx) => (
              <motion.div
                key={category}
                className="skill-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{category}</h3>
                <div className="skill-list">
                  {skills.map((skill) => (
                    <div key={skill._id} className="skill-item">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-proficiency">
                        <div className="proficiency-badge">{skill.proficiency}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
