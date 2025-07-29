// lib/firebase.js
// import { initializeApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "XXXXXXX",
//   appId: "YOUR_APP_ID"
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA7-FWHhVj7BTzwE92uwvOFTsuqaeWi-4",
  authDomain: "al-faruq-islamic-school.firebaseapp.com",
  projectId: "al-faruq-islamic-school",
  storageBucket: "al-faruq-islamic-school.firebasestorage.app",
  messagingSenderId: "248274233538",
  appId: "1:248274233538:web:0c4a2df0faf8194ffa335b",
  measurementId: "G-7K7XSWYDT4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
export const auth = getAuth(app);