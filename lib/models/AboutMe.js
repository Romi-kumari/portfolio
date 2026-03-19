import mongoose from 'mongoose';

const AboutMeSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: '/profile.jpg',
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AboutMe || mongoose.model('AboutMe', AboutMeSchema);
