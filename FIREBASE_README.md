# Firebase Integration Guide - Cuidar.mente

This document explains how to set up Firebase for the Cuidar.mente application. Currently, the app uses local mock data, but the architecture is ready for Firebase integration.

## Overview

Firebase will be used for:
- **Quotes Collection**: Store and manage motivational quotes by mood
- **Resources Collection**: Manage helpful resources and links
- **Analytics**: Track user mood patterns (optional)

## Current Status

✓ **Local mock data is working** - No Firebase setup required to run the app
ℹ️ **Firebase is optional** - Add it when you need persistent, cloud-managed data

## Environment Variables

To enable Firebase, create a `.env.local` file in the root directory with these variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id (optional)
```

### How to Get These Values

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select an existing one
3. Go to **Project Settings** (gear icon)
4. Under **Your apps**, click the web app (or create one if needed)
5. Copy the configuration object - it contains all the values you need
6. Paste them into `.env.local` using the format above

## Database Structure (Firestore)

When you enable Firebase, these collections should be created:

### `quotes` Collection

```typescript
{
  id: string;              // Document ID
  mood: string;            // "feliz", "neutro", "cansado", "ansioso", "triste"
  text: string;            // The quote text
  author?: string;         // Optional author name
  createdAt: Date;         // Auto-set timestamp
  updatedAt: Date;         // Auto-set timestamp
}
```

**Example Document:**
```json
{
  "mood": "feliz",
  "text": "A felicidade é a maior forma de riqueza.",
  "author": null,
  "createdAt": "2026-03-11T12:00:00Z",
  "updatedAt": "2026-03-11T12:00:00Z"
}
```

### `resources` Collection

```typescript
{
  id: string;              // Document ID
  title: string;           // Resource title
  description: string;     // Short description
  url: string;            // External link
  type: string;           // "hotline", "book", "music", "course", "video", "gov"
  category: string;       // "apoio", "livros", "musica", "cursos", "videos", "outros"
  createdAt: Date;        // Auto-set timestamp
  updatedAt: Date;        // Auto-set timestamp
  affiliateCode?: string; // Optional affiliate/tracking code
}
```

**Example Document:**
```json
{
  "title": "Centro de Valorização da Vida (CVV)",
  "description": "Apoio emocional e prevenção do suicídio...",
  "url": "https://www.cvv.org.br/",
  "type": "hotline",
  "category": "apoio",
  "affiliateCode": null,
  "createdAt": "2026-03-11T12:00:00Z",
  "updatedAt": "2026-03-11T12:00:00Z"
}
```

### `moodLogs` Collection (Optional)

Track user mood patterns:

```typescript
{
  id: string;              // Document ID
  userId?: string;         // Optional user ID (if using auth)
  mood: string;           // The selected mood
  timestamp: Date;        // When the mood was logged
  metadata?: {
    device?: string;      // Device info (optional)
    location?: string;    // Location info (optional)
  }
}
```

## Enabling Firebase in the App

### Step 1: Set Environment Variables

Create `.env.local` with your Firebase credentials (see above).

### Step 2: Update Firebase Config

Edit `client/src/lib/firebase-config.ts` and uncomment the initialization code:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
```

### Step 3: Install Firebase Packages

```bash
npm install firebase
```

### Step 4: Update Services

Update the following files to use Firebase instead of mock data:
- `server/routes.ts` - Update API endpoints to fetch from Firestore
- `client/src/hooks/use-resources.ts` - Update to fetch from Firebase
- `client/src/hooks/use-mood-logs.ts` - Update to save mood logs to Firebase

## Migration Path

### Phase 1: Local Data (Current)
- ✓ Using mock data from `client/src/lib/resources-data.ts`
- ✓ Using local mock quotes
- API endpoints return hardcoded data

### Phase 2: Firebase Integration
- Set up Firebase project and credentials
- Create Firestore collections
- Update API endpoints to read from Firestore
- Keep writing to local storage during transition

### Phase 3: Full Migration
- All data comes from Firebase
- User authentication (optional)
- Analytics and metrics

## Security Rules (When Using Firestore)

Create these security rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read quotes and resources
    match /quotes/{document=**} {
      allow read: if true;
    }
    match /resources/{document=**} {
      allow read: if true;
    }
    
    // Only authenticated users can write mood logs
    match /moodLogs/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Affiliate Link Integration

The `resources` collection includes an optional `affiliateCode` field for future affiliate programs:

```typescript
interface FirebaseResource {
  // ... other fields
  affiliateCode?: string;  // e.g., "amazon-assoc-123", "skillshare-ref-456"
}
```

You can use this to:
- Track affiliate links
- Generate unique URLs
- Analyze click-through rates

## Troubleshooting

### "Firebase not configured - using local mock data"
**Status:** This is normal when environment variables aren't set. The app will use mock data.

### "CORS errors when calling API"
**Solution:** Make sure your Firestore security rules allow reads from your domain.

### "Firebase SDK not installed"
**Solution:** Run `npm install firebase`

### "firebaseApp is not defined"
**Solution:** Make sure you uncommented the Firebase initialization in `firebase-config.ts` AND set your environment variables.

## Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com)
- [React + Firebase Best Practices](https://firebase.google.com/docs/database/usage/best-practices)

## Architecture Notes

The codebase is structured to make Firebase integration seamless:

1. **Separation of Concerns**: Mock data and Firebase calls are isolated
2. **Type Definitions**: Firebase document types are pre-defined
3. **Environment Variables**: Firebase config uses standard env vars
4. **Gradual Migration**: Can switch from mock data to Firebase incrementally

## Questions?

Refer to the inline comments in:
- `client/src/lib/firebase-config.ts` - Firebase setup and types
- `client/src/lib/resources-data.ts` - Mock data structure
- `server/routes.ts` - API endpoints ready for Firebase
