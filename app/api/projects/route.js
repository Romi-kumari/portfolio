import dbConnect from '@/lib/mongodb';
import { Project } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ startDate: -1 });
    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const project = new Project(data);
    await project.save();
    return Response.json(project);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    return Response.json(project);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    await Project.findByIdAndDelete(id);
    return Response.json({ message: 'Project deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
