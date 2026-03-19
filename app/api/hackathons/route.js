import dbConnect from '@/lib/mongodb';
import { Hackathon } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function GET() {
  try {
    await dbConnect();
    const hackathons = await Hackathon.find().sort({ startDate: -1 });
    return Response.json(hackathons);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const hackathon = new Hackathon(data);
    await hackathon.save();
    return Response.json(hackathon);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const hackathon = await Hackathon.findByIdAndUpdate(id, data, { new: true });
    return Response.json(hackathon);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    await Hackathon.findByIdAndDelete(id);
    return Response.json({ message: 'Hackathon deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
