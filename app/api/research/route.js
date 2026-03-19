import dbConnect from '@/lib/mongodb';
import { Research } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function GET() {
  try {
    await dbConnect();
    const research = await Research.find().sort({ publicationDate: -1 });
    return Response.json(research);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const res = new Research(data);
    await res.save();
    return Response.json(res);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const res = await Research.findByIdAndUpdate(id, data, { new: true });
    return Response.json(res);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    await Research.findByIdAndDelete(id);
    return Response.json({ message: 'Research deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
