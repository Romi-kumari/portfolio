import dbConnect from '@/lib/mongodb';
import { Certificate } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function GET() {
  try {
    await dbConnect();
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    return Response.json(certificates);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const certificate = new Certificate(data);
    await certificate.save();
    return Response.json(certificate);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const certificate = await Certificate.findByIdAndUpdate(id, data, { new: true });
    return Response.json(certificate);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    await Certificate.findByIdAndDelete(id);
    return Response.json({ message: 'Certificate deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
