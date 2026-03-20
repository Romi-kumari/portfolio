import dbConnect from '@/lib/mongodb';
import { Resume } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET() {
  try {
    await dbConnect();
    const resume = await Resume.findOne();
    return Response.json(resume || { message: 'No resume found' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, title, fileUrl, description, downloadable } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    let resume = await Resume.findOne();
    if (resume) {
      resume.title = title;
      resume.fileUrl = fileUrl;
      resume.description = description;
      resume.downloadable = downloadable;
      await resume.save();
    } else {
      resume = new Resume({ title, fileUrl, description, downloadable });
      await resume.save();
    }
    
    return Response.json(resume);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    await Resume.deleteOne({});
    
    return Response.json({ message: 'Resume deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
