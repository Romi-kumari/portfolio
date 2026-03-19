# MERN Stack Portfolio

A professional, full-stack portfolio website built with MERN (MongoDB, Express, React, Node.js) technology with a beautiful dark theme, animations, and an admin dashboard for content management.

## Features

- **Modern Dark Theme** - Sleek, professional design with pink/red accents
- **14 Section Portfolio** - Home, About, Resume, Education, Skills, Projects, Certificates, Achievements, Internships, Hackathons, Research, Contact, and Footer
- **Smooth Animations** - Framer Motion animations on hero section and all components
- **Admin Dashboard** - Password-protected dashboard to manage all portfolio content
- **Database Integration** - MongoDB for storing contact submissions and portfolio data
- **Responsive Design** - Mobile-friendly interface for all screen sizes
- **Single Page Application** - Smooth navigation using React Router

## Project Structure

```
portfolio-app/
├── server/                    # Express backend
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication middleware
│   ├── server.js             # Main server file
│   └── .env                  # Environment variables
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx          # Main app component
│   │   └── index.js         # Entry point
│   └── public/              # Static files
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local instance running on localhost:27017)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create/Update `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## MongoDB Connection

Make sure MongoDB is running locally on port 27017. If using MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## Admin Dashboard

Access the admin panel at: `http://localhost:3000/admin`

**Default Password**: `admin123` (change in .env)

### Admin Features:
- Edit About Me section
- Manage Resume/CV
- Add/Edit/Delete Education entries
- Manage Skills and proficiency levels
- Manage Project portfolio
- Manage Certificates
- Manage Achievements
- Manage Internship/Training records
- Manage Hackathon participations
- Manage Research publications
- View all contact form submissions

## API Endpoints

### Public Endpoints (GET)
- `GET /api/aboutme` - Get about me info
- `GET /api/resume` - Get resume details
- `GET /api/education` - Get education list
- `GET /api/skills` - Get skills list
- `GET /api/projects` - Get projects list
- `GET /api/certificates` - Get certificates
- `GET /api/achievements` - Get achievements
- `GET /api/internships` - Get internships
- `GET /api/hackathons` - Get hackathons
- `GET /api/research` - Get research papers
- `POST /api/contacts` - Submit contact form

### Admin Endpoints (POST/PUT/DELETE)
All admin endpoints require `x-admin-password` header with correct password.

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **CSS3** - Styling
- **Tailwind-inspired design** - Dark theme styling

## Customization

### Changing Admin Password
Edit `server/.env`:
```
ADMIN_PASSWORD=your_new_password
```

### Changing Color Scheme
Edit `client/src/styles/global.css`:
```css
:root {
  --primary: #1a1a1a;
  --secondary: #2d2d2d;
  --accent: #ff6b9d;
  --accent-light: #ff9cb5;
  /* ... */
}
```

### Adding Your Profile Image
Replace or update the profile image path in the AboutMe component or upload via admin panel.

## Deployment

### Deploy Backend (Heroku, Railway, etc.)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel, Netlify, etc.)
1. Build the app: `npm run build`
2. Deploy the `build` folder
3. Update API URL to production backend URL

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

**Built with passion for professional portfolios** ❤️
