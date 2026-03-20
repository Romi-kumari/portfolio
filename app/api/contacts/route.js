import dbConnect from '@/lib/mongodb';
import { Contact } from '@/lib/models/index';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    if (password !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return Response.json(contacts);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    
    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    return Response.json({ message: 'Contact submitted successfully', contact });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, password } = await request.json();

    if (password !== 'admin123') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    await Contact.findByIdAndDelete(id);

    return Response.json({ message: 'Deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}