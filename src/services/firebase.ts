import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, authInstance?: Auth) {
  const currentAuth = authInstance || auth;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentAuth?.currentUser?.uid || null,
      email: currentAuth?.currentUser?.email || null,
      emailVerified: currentAuth?.currentUser?.emailVerified || null,
      isAnonymous: currentAuth?.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

try {
  // Check if firebase app is already initialized
  if (getApps().length > 0) {
    appInstance = getApp();
    dbInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
  } else {
    // Attempt to load firebase config if injected
    const dummyConfig = {
      apiKey: "AIzaSyDemoKeyForSIMSANAppLocalPreviewModeOnly",
      authDomain: "simsan-app.firebaseapp.com",
      projectId: "simsan-app",
      storageBucket: "simsan-app.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef123456"
    };
    appInstance = initializeApp(dummyConfig);
    dbInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
  }
} catch (e) {
  console.warn("Firebase initialization warning (using local fallback mode):", e);
}

export const app = appInstance;
export const db = dbInstance;
export const auth = authInstance;
