import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Paste your Firebase configuration here from the Firebase Console
  apiKey: "AIzaSyA9alv_MInXWlfBI2APRM7SMmnf0Bkuxc8",
  authDomain: "healthifyme-f6576.firebaseapp.com",
  projectId: "healthifyme-f6576",
  storageBucket: "healthifyme-f6576.firebasestorage.app",
  messagingSenderId: "1093691937328",
  appId: "1:1093691937328:web:0038bfa82a1a74117a13f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);