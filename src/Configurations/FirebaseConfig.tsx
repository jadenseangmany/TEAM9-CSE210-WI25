// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';

// from Firebase console)
const firebaseConfig = {
  apiKey: 'AIzaSyBRk1V3LnlOZgXwOPyjYl3PgBFK-VRZ5cQ',
  authDomain: 'cse210-5a9e5.firebasestorage.app',
  projectId: 'cse210-5a9e5',
  storageBucket: 'cse210-5a9e5.firebasestorage.app',
  messagingSenderId: '715200893028',
  appId: '1:715200893028:android:0117645195781e04bccf71',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(app); 
const auth = getAuth(app); 

export { db, auth }; 
