// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmtHKwIgNXeXwvdpDI4IACF6J1OM_dSEU",
  authDomain: "retreats-fda52.firebaseapp.com",
  projectId: "retreats-fda52",
  storageBucket: "retreats-fda52.firebasestorage.app",
  messagingSenderId: "781586984476",
  appId: "1:781586984476:web:9454d88323094287d2b9d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db= getFirestore(app);
export const storage = getStorage(app);