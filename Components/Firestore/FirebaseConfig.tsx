// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Or any other Firebase service you need
import { getAuth } from 'firebase/auth'; // For authentication

// Your Firebase config object (from Firebase console)
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
const db = getFirestore(app); // Example for Firestore
const auth = getAuth(app); // Example for Authentication

export { db, auth }; // Export the Firebase services for use in your app
