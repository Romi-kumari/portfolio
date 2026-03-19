# MERN Portfolio Website - Setup Guide

This is a full-stack MERN portfolio built with **Next.js** (which includes both frontend and backend API routes) and **MongoDB**.

## Architecture

- **Frontend**: React components with Framer Motion animations (dark theme with pink accents)
- **Backend**: Next.js API Routes for all CRUD operations
- **Database**: MongoDB (local or Atlas)
- **Admin Dashboard**: Password-protected interface to manage portfolio content

## Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Option A: Install locally or Option B: Use MongoDB Atlas (cloud)
3. **npm** or **yarn** package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 16
- React 19
- Mongoose (MongoDB ODM)
- Framer Motion (animations)
- Axios (HTTP client)

### 2. Setup MongoDB

**Option A: Local MongoDB** (Recommended for development)
```bash
# Install MongoDB Community Edition from: https://www.mongodb.com/try/download/community
# Start MongoDB service on port 27017
mongod
```

**Option B: MongoDB Atlas** (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Update `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 3. Configure Environment Variables

The `.env.local` file is already created with default values:

```
MONGODB_URI=mongodb://localhost:27017/portfolio
ADMIN_PASSWORD=admin123
```

**Important**: Change `ADMIN_PASSWORD` to a secure password for production!

### 4. Start Development Server

```bash
npm run dev
```

The app will start at **http://localhost:3000**

## Usage

### Public Portfolio Website
Visit: **http://localhost:3000/portfolio**

You'll see all portfolio sections:
- Hero section with animated greeting
- About Me with profile image
- Resume/CV
- Education timeline
- Skills by category
- Projects showcase
- Certificates
- Achievements
- Internships
- Hackathons
- Research & Publications
- Contact form

### Admin Dashboard
Visit: **http://localhost:3000/admin**

**Login Credentials:**
- Password: `admin123` (change this in `.env.local`)

**Features:**
- Manage About Me section
- Upload/manage resume
- Add/edit/delete education
- Manage skills
- Add/edit/delete projects
- Manage certificates
- Manage achievements
- Manage internships
- Manage hackathons
- Manage research publications
- View all contact form submissions

## File Structure

```
portfolio-app/
├── app/
│   ├── api/                    # API Routes
│   │   ├── aboutme/route.js
│   │   ├── education/route.js
│   │   ├── skills/route.js
│   │   ├── projects/route.js
│   │   ├── certificates/route.js
│   │   ├── achievements/route.js
│   │   ├── internships/route.js
│   │   ├── hackathons/route.js
│   │   ├── research/route.js
│   │   ├── resume/route.js
│   │   └── contacts/route.js
│   ├── admin/                  # Admin Dashboard
│   │   ├── page.tsx
│   │   └── admin.css
│   ├── portfolio/              # Portfolio Page
│   │   ├── page.tsx
│   │   └── portfolio.css
│   ├── page.tsx               # Redirect to /portfolio
│   └── layout.tsx
├── lib/
│   ├── mongodb.js             # MongoDB connection
│   └── models/
│       ├── AboutMe.js
│       └── index.js           # All other models
├── public/
│   └── profile.jpg            # Generated profile image
├── .env.local                 # Environment variables
├── package.json
└── next.config.js
```

## API Endpoints

### Public Endpoints (GET requests)
- `GET /api/aboutme` - Get about me section
- `GET /api/resume` - Get resume/CV
- `GET /api/education` - Get all education
- `GET /api/skills` - Get all skills
- `GET /api/projects` - Get all projects
- `GET /api/certificates` - Get all certificates
- `GET /api/achievements` - Get all achievements
- `GET /api/internships` - Get all internships
- `GET /api/hackathons` - Get all hackathons
- `GET /api/research` - Get all research
- `POST /api/contacts` - Submit contact form

### Admin Endpoints (Requires password)
- `POST /api/*` - Create new entry
- `PUT /api/*` - Update entry
- `DELETE /api/*` - Delete entry
- `GET /api/contacts?password=admin123` - View submissions

All admin requests require `password: "admin123"` in the request body.

## MongoDB Models

### AboutMe
```javascript
{
  bio: String,
  profileImage: String,
  title: String,
  location: String
}
```

### Education
```javascript
{
  degree: String,
  institution: String,
  startDate: Date,
  endDate: Date,
  description: String,
  cgpa: String
}
```

### Skill
```javascript
{
  name: String,
  category: String,
  proficiency: String (Beginner/Intermediate/Expert)
}
```

### Project
```javascript
{
  title: String,
  description: String,
  image: String,
  link: String,
  technologies: [String],
  startDate: Date,
  endDate: Date,
  featured: Boolean
}
```

*And 6 more models: Certificate, Achievement, Internship, Hackathon, Research, Resume, Contact*

## Features

✅ **Fully Responsive** - Works on desktop, tablet, and mobile  
✅ **Dark Theme** - Professional dark design with pink accents  
✅ **Animations** - Smooth Framer Motion animations on hero and cards  
✅ **Admin Dashboard** - Easy content management  
✅ **Contact Form** - Stores submissions in MongoDB  
✅ **SEO Friendly** - Proper Next.js metadata and structure  
✅ **Performance Optimized** - Next.js image optimization and lazy loading  

## Development Tips

### Add Sample Data

Connect to MongoDB and insert sample data:

```javascript
// In MongoDB CLI
use portfolio
db.aboutmes.insertOne({
  bio: "I am a passionate MERN developer...",
  title: "MERN Stack Developer",
  location: "India"
})
```

### Update Profile Image

Replace `/public/profile.jpg` with your own image.

### Change Theme Colors

Edit `/app/portfolio/portfolio.css`:
```css
:root {
  --primary: #000;           /* Background */
  --accent: #ff4d7d;         /* Pink/Red accent */
  --text: #fff;              /* Text color */
}
```

### Deploy to Vercel

```bash
# Push to GitHub first
git push

# Then deploy from Vercel dashboard
# https://vercel.com/new
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env.local`
- Verify MongoDB service is accessible on localhost:27017

### API Routes Returning 404
- Make sure the route file is in the correct `/app/api/` folder
- Restart the dev server after creating new routes

### Images Not Loading
- Check that image URLs are correct
- For local images, use `/profile.jpg` format in public folder

### Port Already in Use
```bash
# Kill process on port 3000
# Linux/Mac: lsof -ti:3000 | xargs kill -9
# Windows: netstat -ano | findstr :3000
```

## Support & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

**Happy coding! 🚀**
