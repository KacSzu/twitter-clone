// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-2386e.firebaseapp.com",
  projectId: "twitter-clone-2386e",
  storageBucket: "twitter-clone-2386e.appspot.com",
  messagingSenderId: "898656760527",
  appId: "1:898656760527:web:682775eb4299117f94fdba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
