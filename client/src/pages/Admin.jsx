import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('aboutme');
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('adminPassword') || '');

  const handleLogin = () => {
    if (password) {
      setAdminPassword(password);
      localStorage.setItem('adminPassword', password);
      setAuthenticated(true);
      setPassword('');
    } else {
      alert('Please enter a password');
    }
  };

  if (!adminPassword) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h1>Admin Portal</h1>
          <p>Enter your admin password to continue</p>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <button 
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem('adminPassword');
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        {['aboutme', 'resume', 'education', 'skills', 'projects', 'certificates', 'achievements', 'internships', 'hackathons', 'research', 'contacts'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'aboutme' && <AboutMeManager adminPassword={adminPassword} />}
        {activeTab === 'resume' && <ResumeManager adminPassword={adminPassword} />}
        {activeTab === 'education' && <EducationManager adminPassword={adminPassword} />}
        {activeTab === 'skills' && <SkillsManager adminPassword={adminPassword} />}
        {activeTab === 'projects' && <ProjectsManager adminPassword={adminPassword} />}
        {activeTab === 'certificates' && <CertificatesManager adminPassword={adminPassword} />}
        {activeTab === 'achievements' && <AchievementsManager adminPassword={adminPassword} />}
        {activeTab === 'internships' && <InternshipsManager adminPassword={adminPassword} />}
        {activeTab === 'hackathons' && <HackathonsManager adminPassword={adminPassword} />}
        {activeTab === 'research' && <ResearchManager adminPassword={adminPassword} />}
        {activeTab === 'contacts' && <ContactsViewer adminPassword={adminPassword} />}
      </div>
    </div>
  );
}

// AboutMe Manager
function AboutMeManager({ adminPassword }) {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({ bio: '', title: '', location: '', profileImage: '' });

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const fetchAboutMe = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/aboutme');
      const result = await response.json();
      if (result._id) {
        setData(result);
        setFormData(result);
      }
    } catch (error) {
      console.error('Error fetching about me:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = data ? 'PUT' : 'POST';
      const url = data ? `http://localhost:5000/api/aboutme/${data._id}` : 'http://localhost:5000/api/aboutme';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('About Me updated successfully');
        fetchAboutMe();
      } else {
        alert('Error updating About Me');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="manager-section">
      <h2>About Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          rows="5"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Profile Image URL"
          value={formData.profileImage}
          onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

// Resume Manager (simplified)
function ResumeManager({ adminPassword }) {
  return <div className="manager-section"><h2>Resume Manager</h2><p>Configure resume/CV upload here.</p></div>;
}

// Education Manager (simplified)
function EducationManager({ adminPassword }) {
  return <div className="manager-section"><h2>Education Manager</h2><p>Manage education entries here.</p></div>;
}

// Skills Manager (simplified)
function SkillsManager({ adminPassword }) {
  return <div className="manager-section"><h2>Skills Manager</h2><p>Manage skills here.</p></div>;
}

// Projects Manager (simplified)
function ProjectsManager({ adminPassword }) {
  return <div className="manager-section"><h2>Projects Manager</h2><p>Manage projects here.</p></div>;
}

// Certificates Manager (simplified)
function CertificatesManager({ adminPassword }) {
  return <div className="manager-section"><h2>Certificates Manager</h2><p>Manage certificates here.</p></div>;
}

// Achievements Manager (simplified)
function AchievementsManager({ adminPassword }) {
  return <div className="manager-section"><h2>Achievements Manager</h2><p>Manage achievements here.</p></div>;
}

// Internships Manager (simplified)
function InternshipsManager({ adminPassword }) {
  return <div className="manager-section"><h2>Internships Manager</h2><p>Manage internships here.</p></div>;
}

// Hackathons Manager (simplified)
function HackathonsManager({ adminPassword }) {
  return <div className="manager-section"><h2>Hackathons Manager</h2><p>Manage hackathons here.</p></div>;
}

// Research Manager (simplified)
function ResearchManager({ adminPassword }) {
  return <div className="manager-section"><h2>Research Manager</h2><p>Manage research papers here.</p></div>;
}

// Contacts Viewer
function ContactsViewer({ adminPassword }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: {
          'x-admin-password': adminPassword,
        },
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-section">
      <h2>Contact Messages</h2>
      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contact messages yet.</p>
      ) : (
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-item">
              <h4>{contact.name}</h4>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p className="date">{new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
