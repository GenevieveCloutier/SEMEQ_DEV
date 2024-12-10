import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('./database.sqlite');
  
  try {
    const file = fs.readFileSync(filePath);
    return new Response(file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=database.sqlite',
      },
    });
  } catch (err) {
    return new Response('File not found', { status: 404 });
  }
}
