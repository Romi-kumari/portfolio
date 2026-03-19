import dbConnect from '@/lib/mongodb';
import AboutMe from '@/lib/models/AboutMe';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function GET() {
  try {
    await dbConnect();
    const aboutMe = await AboutMe.findOne();
    return Response.json(aboutMe || { message: 'No about me data found' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, bio, title, profileImage, location } = await request.json();
    
    if (password !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    let aboutMe = await AboutMe.findOne();
    if (aboutMe) {
      aboutMe.bio = bio;
      aboutMe.title = title;
      aboutMe.profileImage = profileImage || aboutMe.profileImage;
      aboutMe.location = location;
      await aboutMe.save();
    } else {
      aboutMe = new AboutMe({ bio, title, profileImage, location });
      await aboutMe.save();
    }
    
    return Response.json(aboutMe);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
