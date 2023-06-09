import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAn0LVUKyqmzX8awNAsjOcSgMJS7pmtDaM",
  authDomain: "project-1-574fe.firebaseapp.com",
  projectId: "project-1-574fe",
  storageBucket: "project-1-574fe.appspot.com",
  messagingSenderId: "720867987923",
  appId: "1:720867987923:web:32d93831858ef6f1c35f26",
  measurementId: "G-FNQ47T7WMP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);