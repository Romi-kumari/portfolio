import mongoose from 'mongoose';

// Education Model
const EducationSchema = new mongoose.Schema(
  {
    degree: String,
    institution: String,
    startDate: Date,
    endDate: Date,
    description: String,
    grade: String,
  },
  { timestamps: true }
);

// Skill Model
const SkillSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    proficiency: String,
  },
  { timestamps: true }
);

// Project Model
const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    link: String,
    technologies: [String],
    startDate: Date,
    endDate: Date,
    featured: Boolean,
  },
  { timestamps: true }
);

// Certificate Model
const CertificateSchema = new mongoose.Schema(
  {
    title: String,
    issuer: String,
    issueDate: Date,
    credentialUrl: String,
    description: String,
  },
  { timestamps: true }
);

// Achievement Model
const AchievementSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    achievementDate: Date,
    category: String,
  },
  { timestamps: true }
);

// Internship Model
const InternshipSchema = new mongoose.Schema(
  {
    companyName: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    technologies: [String],
    location: String,
  },
  { timestamps: true }
);

// Hackathon Model
const HackathonSchema = new mongoose.Schema(
  {
    eventName: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    technologies: [String],
    link: String,
  },
  { timestamps: true }
);

// Research Model
const ResearchSchema = new mongoose.Schema(
  {
    title: String,
    authors: [String],
    publicationDate: Date,
    journal: String,
    description: String,
    link: String,
    category: String,
  },
  { timestamps: true }
);

// Resume Model
const ResumeSchema = new mongoose.Schema(
  {
    title: String,
    fileUrl: String,
    description: String,
    downloadable: Boolean,
  },
  { timestamps: true }
);

// Contact Model
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
export const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
export const Internship = mongoose.models.Internship || mongoose.model('Internship', InternshipSchema);
export const Hackathon = mongoose.models.Hackathon || mongoose.model('Hackathon', HackathonSchema);
export const Research = mongoose.models.Research || mongoose.model('Research', ResearchSchema);
export const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
