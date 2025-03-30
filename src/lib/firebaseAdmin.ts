import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'the-duck-experience.firebasestorage.app'
    });
    
    console.log('Firebase Admin initialized successfully');
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error);
    throw error; // Throw the actual error for better debugging
  }
}

export default admin;