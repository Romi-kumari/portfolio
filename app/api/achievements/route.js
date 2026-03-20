import dbConnect from '@/lib/mongodb';
import { Achievement } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find().sort({ achievementDate: -1 });
    return Response.json(achievements);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const achievement = new Achievement(data);
    await achievement.save();
    return Response.json(achievement);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, password, ...data } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const achievement = await Achievement.findByIdAndUpdate(id, data, { new: true });
    return Response.json(achievement);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    await Achievement.findByIdAndDelete(id);
    return Response.json({ message: 'Achievement deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
