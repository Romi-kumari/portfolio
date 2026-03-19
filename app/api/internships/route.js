import dbConnect from '@/lib/mongodb';
import { Internship } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function GET() {
  try {
    await dbConnect();
    const internships = await Internship.find().sort({ startDate: -1 });
    return Response.json(internships);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const internship = new Internship(data);
    await internship.save();
    return Response.json(internship);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const internship = await Internship.findByIdAndUpdate(id, data, { new: true });
    return Response.json(internship);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    await Internship.findByIdAndDelete(id);
    return Response.json({ message: 'Internship deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
