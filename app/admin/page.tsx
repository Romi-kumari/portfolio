'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/app/admin/admin.css';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('aboutme');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAdminPassword(password);
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };
  console.log("ENV:", process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="login-form">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <Link href="/portfolio">← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <Link href="/portfolio" className="back-btn">Back to Portfolio</Link>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'aboutme' ? 'active' : ''}`}
          onClick={() => setActiveTab('aboutme')}
        >
          About Me
        </button>
        <button
          className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
        >
          Resume
        </button>
        <button
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          Certificates
        </button>
        <button
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={`tab-btn ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          Internships
        </button>
        <button
          className={`tab-btn ${activeTab === 'hackathons' ? 'active' : ''}`}
          onClick={() => setActiveTab('hackathons')}
        >
          Hackathons
        </button>
        <button
          className={`tab-btn ${activeTab === 'research' ? 'active' : ''}`}
          onClick={() => setActiveTab('research')}
        >
          Research
        </button>
        <button
          className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'aboutme' && <AboutMeManager password={adminPassword} />}
        {activeTab === 'resume' && <ResumeManager password={adminPassword} />}
        {activeTab === 'education' && <EducationManager password={adminPassword} />}
        {activeTab === 'skills' && <SkillsManager password={adminPassword} />}
        {activeTab === 'projects' && <ProjectsManager password={adminPassword} />}
        {activeTab === 'certificates' && <CertificatesManager password={adminPassword} />}
        {activeTab === 'achievements' && <AchievementsManager password={adminPassword} />}
        {activeTab === 'internships' && <InternshipsManager password={adminPassword} />}
        {activeTab === 'hackathons' && <HackathonsManager password={adminPassword} />}
        {activeTab === 'research' && <ResearchManager password={adminPassword} />}
        {activeTab === 'contacts' && <ContactsManager password={adminPassword} />}
      </div>
    </div>
  );
}

function AboutMeManager({ password }) {
  const [data, setData] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/aboutme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, password}),
      });
      if (res.ok) {
        setMessage('About Me updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating');
    }
  };

  return (
    <div className="manager-form">
      <h2>Manage About Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title (e.g., MERN Stack Developer)"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          value={data.bio}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
          rows={5}
        />
        <input
          type="text"
          placeholder="Profile Image URL"
          value={data.profileImage}
          onChange={(e) => setData({ ...data, profileImage: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

function ResumeManager({ password }) {
  const [data, setData] = useState({ title: '', fileUrl: '', description: '', downloadable: true });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, password}),
      });
      if (res.ok) {
        setMessage('Resume updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating');
    }
  };

  return (
    <div className="manager-form">
      <h2>Manage Resume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Resume Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Resume File URL"
          value={data.fileUrl}
          onChange={(e) => setData({ ...data, fileUrl: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={3}
        />
        <label>
          <input
            type="checkbox"
            checked={data.downloadable}
            onChange={(e) => setData({ ...data, downloadable: e.target.checked })}
          />
          Downloadable
        </label>
        <button type="submit">Update</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

function EducationManager({ password }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ degree: '', institution: '', description: '', startDate: '', endDate: '',grade: '' });
  const [message, setMessage] = useState('');

 const handleAdd = async (e) => {
  e.preventDefault();
  console.log("FORM DATA BEFORE SEND:", { ...form, password });
  try {
    const res = await fetch('/api/education', {
      method: 'POST',

      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, password }),
    });
    console.log("FORM DATA:", form);
    const data = await res.json();

    console.log("SERVER RESPONSE:", data); // 🔥 IMPORTANT

    if (!res.ok) {
      setMessage(data.error || 'Error adding');
      return;
    }
    
    setForm({
      degree: '',
      institution: '',
      description: '',
      startDate: '',
      endDate: '',
      grade: '',
    });
  
    setMessage('Education added successfully!');
  } catch (error) {
    console.error("FETCH ERROR:", error); // 🔥 IMPORTANT
    setMessage('Server error');
  }
};

  return (
    <div className="manager-form">
      <h2>Manage Education</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} required />
        <input type="text" placeholder="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        <input
  type="text"
  placeholder="Grade / CGPA (e.g., 8.5 CGPA)"
  value={form.grade}
  onChange={(e) => setForm({ ...form, grade: e.target.value })}
/>
        <button type="submit">Add Education</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

function SkillsManager({ password }) {
  const [form, setForm] = useState({ name: '', category: '', proficiency: '' });
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, password}),
      });
      if (res.ok) {
        setForm({ name: '', category: '', proficiency: '' });
        setMessage('Skill added successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error adding');
    }
  };

  return (
    <div className="manager-form">
      <h2>Manage Skills</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Skill Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <select value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: e.target.value })} required>
          <option value="">Select Proficiency</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
        <button type="submit">Add Skill</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

function ProjectsManager({ password }) {
  const [form, setForm] = useState({ title: '', description: '', image: '', link: '', technologies: '' });
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || 'Error adding');
      return;
    }

    setForm({
      degree: '',
      institution: '',
      description: '',
      startDate: '',
      endDate: '',
      grade: ''
    });

    setMessage('Education added successfully!');
    setTimeout(() => setMessage(''), 3000);

  } catch (error) {
    setMessage('Server error');
  }
};

  return (
    <div className="manager-form">
      <h2>Manage Projects</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required />
        <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input type="text" placeholder="Project Link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <input type="text" placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
        <button type="submit">Add Project</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

// Placeholder managers for other sections
function CertificatesManager({password}) {
  const [form, setForm] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    link: ''
  });

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/certificates');
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      title: form.title,
      issuer: form.issuer,
      issueDate: form.issueDate,
      credentialUrl: form.link, // ✅ FIX HERE
      password
}),
    });

    setForm({ title: '', issuer: '', issueDate: '', link: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch('/api/certificates', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    });

    fetchData();
  };

  return (
    <div className="manager-form">
      <h2>Certificates</h2>

      <form onSubmit={handleAdd}>
        <input placeholder="Title" value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})} required />

        <input placeholder="Issuer" value={form.issuer}
          onChange={(e)=>setForm({...form,issuer:e.target.value})} />

        <input type="date" value={form.issueDate}
          onChange={(e)=>setForm({...form,issueDate:e.target.value})} />

        <input placeholder="Link" value={form.link}
          onChange={(e)=>setForm({...form,link:e.target.value})} />

        <button>Add</button>
      </form>

      <div>
        {data.map((c) => (
          <div key={c._id}>
            <p>{c.title}</p>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
function AchievementsManager({password}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    achievementDate: ''
  });

  const [data, setData] = useState([]);

  // Fetch achievements
  const fetchData = async () => {
    try {
      const res = await fetch('/api/achievements');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add achievement
  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch('/api/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, password}),
    });

    setForm({ title: '', description: '', achievementDate: '' });
    fetchData();
  };

  // Delete achievement
  const handleDelete = async (id) => {
    await fetch('/api/achievements', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password}),
    });

    fetchData();
  };

  return (
    <div className="manager-form">
      <h2>Achievements</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />

        <input
          type="date"
          value={form.achievementDate}
          onChange={(e) =>
            setForm({ ...form, achievementDate: e.target.value })
          }
        />

        <button type="submit">Add Achievement</button>
      </form>

      {/* Display Data */}
      <div className="list">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>
              {item.achievementDate
                ? new Date(item.achievementDate).toLocaleDateString()
                : ''}
            </small>

            <button onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function InternshipsManager({password}) {
  const [form, setForm] = useState({
    position: '',
    companyName: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const [data, setData] = useState([]);

  // Fetch internships
  const fetchData = async () => {
    try {
      const res = await fetch('/api/internships');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add internship
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("Password inside manager:", password);
    await fetch('/api/internships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, password }),
    });

    setForm({
      position: '',
      companyName: '',
      description: '',
      startDate: '',
      endDate: ''
    });

    fetchData();
  };

  // Delete internship
  const handleDelete = async (id) => {
    await fetch('/api/internships', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password}),
    });

    fetchData();
  };

  return (
    <div className="manager-form">
      <h2>Internships / Training</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Role (e.g., Web Developer Intern)"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />

        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <button type="submit">Add Internship</button>
      </form>

      {/* Display Data */}
      <div className="list">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.position}</h3>
            <p><strong>{item.companyName}</strong></p>
            <p>{item.description}</p>

            <small>
              {item.startDate
                ? new Date(item.startDate).toLocaleDateString()
                : ''}{' '}
              -{' '}
              {item.endDate
                ? new Date(item.endDate).toLocaleDateString()
                : ''}
            </small>

            <button onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function HackathonsManager({password}) {
  const [form, setForm] = useState({
    eventName: '',
    description: '',
    date: '',
    position: '',
    project: ''
  });

  const [data, setData] = useState([]);

  // Fetch hackathons
  const fetchData = async () => {
    try {
      const res = await fetch('/api/hackathons');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add hackathon
  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch('/api/hackathons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, password}),
    });

    setForm({
      eventName: '',
      description: '',
      date: '',
      position: '',
      project: ''
    });

    fetchData();
  };

  // Delete hackathon
  const handleDelete = async (id) => {
    await fetch('/api/hackathons', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password}),
    });

    fetchData();
  };

  return (
    <div className="manager-form">
      <h2>Hackathons</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Hackathon Name"
          value={form.eventName}
          onChange={(e) => setForm({ ...form, eventName: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Position / Rank (e.g., 2nd place)"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />

        <input
          type="text"
          placeholder="Project Name"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
        />

        <button type="submit">Add Hackathon</button>
      </form>

      {/* Display Data */}
      <div className="list">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.eventName}</h3>
            <p>{item.description}</p>

            {item.project && <p><strong>Project:</strong> {item.project}</p>}
            {item.position && <p><strong>Position:</strong> {item.position}</p>}

            <small>
              {item.date
                ? new Date(item.date).toLocaleDateString()
                : ''}
            </small>

            <button onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function ResearchManager({password}) { return <div className="manager-form"><h2>Manage Research</h2><p>Add research management form here</p></div>; }

function ContactsManager({password}) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/contacts?password=${password}`);;

      if (!res.ok) {
        console.error("Failed to fetch messages");
        return;
      }

      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

 const handleDelete = async (id) => {
  try {
    console.log("Deleting ID:", id); // ✅ check this

    const res = await fetch('/api/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        password
      }),
    });

    const data = await res.json();

    console.log("DELETE RESPONSE:", data); // ✅ IMPORTANT

    if (!res.ok) {
      console.error("Delete failed:", data);
      return;
    }

    setMessages(prev => prev.filter(msg => msg._id !== id));

  } catch (err) {
    console.error("Error:", err);
  }
};

  return (
    <div className="manager-form">
      <h2>📩 Contact Messages</h2>

      {messages.length === 0 && <p>No messages yet</p>}

      <div className="list">
        {messages.map((msg) => (
          <div key={msg._id} className="card fancy-card">
            <h3>👤 {msg.name}</h3>
            <p><strong>📧 {msg.email}</strong></p>
            <p>💬 {msg.message}</p>

            <small>
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleString()
                : ""}
            </small>

            <button
  onClick={() => handleDelete(msg._id)}
  style={{ position: "relative", zIndex: 10 }}
>
  Delete
</button>
          </div>
        ))}
      </div>
    </div>
  );
}