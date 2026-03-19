import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import Resume from '../components/Resume';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Achievements from '../components/Achievements';
import Internships from '../components/Internships';
import Hackathons from '../components/Hackathons';
import Research from '../components/Research';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMe />
      <Resume />
      <Education />
      <Skills />
      <Projects />
      <Certificates />
      <Achievements />
      <Internships />
      <Hackathons />
      <Research />
      <Contact />
      <Footer />
    </>
  );
}
