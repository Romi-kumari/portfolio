import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import './styles/Section.css';

export default function Certificates() {
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/certificates');
      const data = await response.json();
      setCertificatesData(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
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
          Certificates
        </motion.h2>

        {loading ? (
          <p>Loading certificates...</p>
        ) : certificatesData.length === 0 ? (
          <p>No certificates added yet.</p>
        ) : (
          <motion.div
            className="grid-3"
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
            {certificatesData.map((cert) => (
              <motion.div
                key={cert._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card
                  title={cert.title}
                  subtitle={cert.issuer}
                  description={cert.description}
                  link={cert.credentialUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
