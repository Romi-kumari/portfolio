import React from 'react';
import { motion } from 'framer-motion';
import './styles/Card.css';

export default function Card({ title, subtitle, description, image, link, technologies, children }) {
  return (
    <motion.div
      className="card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {description && <p className="card-description">{description}</p>}
        
        {technologies && technologies.length > 0 && (
          <div className="card-technologies">
            {technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">{tech}</span>
            ))}
          </div>
        )}

        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
            View More →
          </a>
        )}

        {children}
      </div>
    </motion.div>
  );
}
