/**
 * Firebase Configuration
 * 
 * This file sets up Firebase for future integration.
 * Currently, the app uses local mock data, but the structure is ready for Firebase.
 * 
 * To enable Firebase:
 * 1. Set the environment variables listed below
 * 2. Uncomment the firebase initialization code
 * 3. Replace mock data functions with Firebase calls
 */

export const firebaseConfig = {
  // These environment variables should be set in your .env.local file
  // See FIREBASE_README.md for setup instructions
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

// Type definitions for Firebase data structures
export interface FirebaseQuote {
  id: string;
  mood: string;
  text: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirebaseResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  affiliateCode?: string;
}

export interface FirebaseMoodLog {
  id: string;
  userId?: string;
  mood: string;
  timestamp: Date;
  metadata?: {
    device?: string;
    location?: string;
  };
}

/**
 * Initialize Firebase when environment variables are set
 * Currently not initialized - using local mock data
 * 
 * To enable, uncomment this section:
 * 
 * import { initializeApp } from "firebase/app";
 * import { getFirestore } from "firebase/firestore";
 * 
 * export const firebaseApp = initializeApp(firebaseConfig);
 * export const db = getFirestore(firebaseApp);
 */

// Placeholder for Firebase initialization
export const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.authDomain
  );
};

export const logFirebaseStatus = (): void => {
  if (isFirebaseConfigured()) {
    console.log("✓ Firebase is configured and ready");
  } else {
    console.log("ℹ Firebase not configured - using local mock data");
  }
};
