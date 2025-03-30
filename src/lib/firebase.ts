// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCveWTJa_agR5o9YhXTA0RIJs3Yx6AIRA",
  authDomain: "the-duck-experience.firebaseapp.com",
  databaseURL: "https://the-duck-experience-default-rtdb.firebaseio.com",
  projectId: "the-duck-experience",
  storageBucket: "the-duck-experience.firebasestorage.app",
  messagingSenderId: "11638167502",
  appId: "1:11638167502:web:5ccaf1105f1406280bfd9f",
  measurementId: "G-JP393Q3RTD"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize analytics only in browser environment
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, auth, storage, analytics };