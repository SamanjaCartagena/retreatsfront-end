// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD61I9XFEQP6iIRJljTRzZ7J3yTKhan6ec",
  authDomain: "retreats-605e8.firebaseapp.com",
  projectId: "retreats-605e8",
  storageBucket: "retreats-605e8.firebasestorage.app",
  messagingSenderId: "162386698128",
  appId: "1:162386698128:web:186d1913949b2007c45d15",
  measurementId: "G-0GMKRVR7X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);