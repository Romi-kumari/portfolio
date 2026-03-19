import React from 'react';
import { motion } from 'framer-motion';
import './styles/Hero.css';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="hero-subtitle">
            MERN Stack Developer
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-title">
            Hi, I am <span className="highlight-text">Romi Kumari</span>
            <br />
            from India
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description">
            Building beautiful and functional web applications with cutting-edge technologies.
            Passionate about creating seamless user experiences and scalable solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <button className="btn btn-primary">Get My CV</button>
            <button className="btn btn-secondary">Explore My Work</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
