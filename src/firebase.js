// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import 'dotenv/config';

const api_key = process.env.API_KEY;
const auth_domain=process.env.AUTH_Domain;
const project_id=process.env.PROJECT_ID;
const storage_bucket=process.env.STORAGE_BUCKET;
const messaging_sender_id=process.env.MESSAGING_SENDER_ID;
const app_id=process.env.APP_ID;
const measurement_id=process.env.MEASUREMENT_ID;


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: app_id,
  measurementId: measurement_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };