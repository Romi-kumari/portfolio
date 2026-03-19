import React from 'react';
import './styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {currentYear} Romi. All rights reserved. Made with passion for professional use.
        </p>
      </div>
    </footer>
  );
}
