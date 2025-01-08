// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import 'dotenv/config';

const api_key = process.env.API_KEY;


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "budget-tracker-af7e6.firebaseapp.com",
  projectId: "budget-tracker-af7e6",
  storageBucket: "budget-tracker-af7e6.firebasestorage.app",
  messagingSenderId: "477089083373",
  appId: "1:477089083373:web:12d06fbc27883efea881e4",
  measurementId: "G-BJJJ18MGKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };