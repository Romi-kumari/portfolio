'use client';

import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from "react-type-animation";

import '@/app/portfolio/portfolio.css';

export default function PortfolioPage() {
  const [aboutMe, setAboutMe] = useState(null);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [research, setResearch] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [aboutRes, eduRes, skillsRes, projRes, certRes, achRes, internRes, hackRes, resRes, resumeRes] = 
        await Promise.all([
          fetch('/api/aboutme'),
          fetch('/api/education'),
          fetch('/api/skills'),
          fetch('/api/projects'),
          fetch('/api/certificates'),
          fetch('/api/achievements'),
          fetch('/api/internships'),
          fetch('/api/hackathons'),
          fetch('/api/research'),
          fetch('/api/resume'),
        ]);

      if (aboutRes.ok) setAboutMe(await aboutRes.json());
      if (eduRes.ok) setEducation(await eduRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (certRes.ok) setCertificates(await certRes.json());
      if (achRes.ok) setAchievements(await achRes.json());
      if (internRes.ok) setInternships(await internRes.json());
      if (hackRes.ok) setHackathons(await hackRes.json());
      if (resRes.ok) setResearch(await resRes.json());
      if (resumeRes.ok) setResume(await resumeRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="portfolio-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            ROMI
          </Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
  <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
  <li><a onClick={() => scrollToSection('about')}>About</a></li>
  <li><a onClick={() => scrollToSection('education')}>Education</a></li>
  <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
  <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
  <li><a onClick={() => scrollToSection('certificates')}>Certificates</a></li>
  <li><a onClick={() => scrollToSection('achievements')}>Achievements</a></li>
  <li><a onClick={() => scrollToSection('internships')}>Internships</a></li>
  <li><a onClick={() => scrollToSection('hackathons')}>Hackathons</a></li>
  <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
  <li><Link href="/admin">Admin</Link></li>
</ul>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section id="hero" className="hero-section">
         <video autoPlay loop muted className="video-bg">
    <source src="/code-bg.mp4" type="video/mp4" />
  </video>

  {/* 🔥 optional overlay (for readability) */}
  <div className="video-overlay"></div>
<div className="hero-light"></div>
        <div className="hero-content">
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="hero-label"
          >
            MERN Stack Developer
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-title"
          >
            Hi, I am <span className="text-pink">Romi</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-subtitle"
          >
            Kumari from India
          </motion.h2>
        </div>
      </motion.section>

      {/* About Section */}
      {aboutMe && (
        <motion.section id="about" className="section">
          <div className="section-content about-grid">
            <div className="about-image">
              <Image
                src={aboutMe.profileImage || '/Profile.jpeg'}
                alt="Profile"
                width={300}
                height={400}
                className="profile-img"
              />
            </div>
            <div className="about-text">
  <h2 className="section-title">👩‍💻 About me</h2>

  <p className="about-bio">
    {aboutMe.bio || "I am Romi Kumari. I'm a passionate full-stack web developer focused on building scalable applications."}
  </p>
  <a href="/Specialised_CV.pdf" className="resume-btn" download>
    Download CV
  </a>
</div>
          </div>
        </motion.section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
  <motion.section id="education" className="section">
    <h2 className="section-title">🎓 Education</h2>

    <div className="education-timeline">
      {education.map((edu, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ delay: idx * 0.1 }}
          className="timeline-item fancy-card"
        >
          <h3>{edu.degree}</h3>

          <p className="institution">🏫 {edu.institution}</p>

          <p className="description">{edu.description}</p>

          {/* ✅ Grade */}
          {(edu.grade || edu.cgpa) && (
  <p className="grade">🎯 {edu.grade || edu.cgpa}</p>
)}

          {/* ✅ Dates */}
          <small className="date">
            {edu.startDate && new Date(edu.startDate).getFullYear()} -{" "}
            {edu.endDate && new Date(edu.endDate).getFullYear()}
          </small>
        </motion.div>
      ))}
    </div>
  </motion.section>
)}

      {/* Skills Section */}
      {skills.length > 0 && (
        <motion.section id="skills" className="section">
          <h2 className="section-title">🛠  Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="skill-card"
              >
                <h4>{skill.name}</h4>
                <p className="skill-category">{skill.category}</p>
                <p className="proficiency">{skill.proficiency}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <motion.section id="projects" className="section">
          <h2 className="section-title">⚡My Work</h2>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="project-card"
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="project-image"
                  />
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
      {/* certificate section */}
   {certificates.length > 0 && (
  <motion.section id="certificates" className="section">
    <h2 className="section-title">📜 Certificates</h2>

    <div className="card-grid">
      {certificates.map((cert, idx) => (
        <motion.a
          key={idx}
          href={
            cert.credentialUrl
              ? cert.credentialUrl.startsWith("http")
                ? cert.credentialUrl
                : `https://${cert.credentialUrl}`
              : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="card fancy-card"
          style={{ display: "block" }}
        >
          <h3>🏅 {cert.title}</h3>

          <p className="issuer">
           🏢 {cert.issuer}
            
          </p>
        </motion.a>
      ))}
    </div>
  </motion.section>
)}
{achievements.length > 0 && (
  <motion.section id="achievements" className="section">
    <h2 className="section-title">🏆 Achievements</h2>

    <div className="card-grid">
      {achievements.map((item, idx) => (
        <motion.div
          key={idx}
          className="card fancy-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <h3>🏆 {item.title}</h3>
          <p>{item.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.section>
)}
{/* internship section */}
{internships.length > 0 && (
  <motion.section id="internships" className="section">
    <h2 className="section-title">💼 Training & Internships</h2>

    <div className="card-grid">
      {internships.map((item, idx) => (
        <motion.div key={idx} className="card">
          <h3>💻 {item.position}</h3>      
<p><strong>🏢 {item.companyName}</strong></p>   
<p>{item.description}</p>
          
        </motion.div>
      ))}
    </div>
  </motion.section>
)}
{/* hackathon section */}
 {hackathons.length > 0 && (
  <motion.section id="hackathons" className="section">
    <h2 className="section-title">🚀 Hackathons</h2>

    <div className="card-grid">
      {hackathons.map((item, idx) => (
        <motion.div
          key={idx}
          className="card fancy-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <h3><strong>🚀 {item.eventName}</strong></h3>   {/* ✅ FIXED */}
           <p>{item.description}</p>

          {item.position && (
            <p><strong>🏆 Position:</strong> {item.position}</p>
          )}

          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              🔗 View Details
            </a>
          )}
        </motion.div>
      ))}
    </div>
  </motion.section>
)}; 



      {/* Contact Section */}
      <motion.section id="contact" className="section contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title">📩  Contact Me</h2>
            <p>
  <a href="mailto:kromi8868@gmail.com" className="contact-link">
    <FaEnvelope className="icon email-icon" /> kromi8868@gmail.com
  </a>
</p>
           <p>
  <a href="tel:+918603583451" className="contact-link">
    <FaPhone className="icon phone-icon" /> 8603583451
  </a>
</p>
            <p> 
              <a href="https://www.linkedin.com/in/romi-kumari22/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link">
  <FaLinkedin className="icon" /> LinkedIn
</a>
            </p>
            <p>
  <a 
    href="https://github.com/Romi-kumari"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-link"
  >
    <FaGithub className="icon" /> GitHub
  </a>
</p>
          </div>
          <ContactForm onSuccess={fetchAllData} />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>Copyright Romi © Made for professional use.</p>
      </footer>
    </div>
  );
}

function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <textarea
        placeholder="Your message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Submit'}
      </button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
