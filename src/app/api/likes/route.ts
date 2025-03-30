import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  try {
    if (!admin.apps.length) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }

    // Validate request
    if (!request.body) {
      return NextResponse.json({ error: 'Missing request body' }, { status: 400 });
    }

    const { userId, fileName } = await request.json();

    // Validate parameters
    if (!userId || !fileName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('Processing like update for:', { userId, fileName });

    const bucket = admin.storage().bucket('the-duck-experience.firebasestorage.app');
    const file = bucket.file(`duck-data/2F${userId}/${fileName}.json`);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      console.error('File not found:', `duck-data/2F${userId}/${fileName}.json`);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Get current metadata
    const [data] = await file.download();
    const currentMetadata = JSON.parse(data.toString());
    
    console.log('Current metadata:', currentMetadata);

    // Update likes
    const updatedMetadata = {
      ...currentMetadata,
      like: (parseInt(currentMetadata.like) || 0) + 1
    };
    
    console.log('Updated metadata:', updatedMetadata);

    // Save updated metadata
    await file.save(JSON.stringify(updatedMetadata, null, 2), {
      contentType: 'application/json',
      metadata: {
        cacheControl: 'no-cache',
      }
    });

    return NextResponse.json(updatedMetadata);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, 
      { status: error.code === 'ENOENT' ? 404 : 500 }
    );
  }
}