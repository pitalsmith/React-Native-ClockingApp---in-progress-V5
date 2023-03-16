// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqvHqJ8aACu9igOtibCjKqBqq2BNTWTYE",
  authDomain: "database-c5a33.firebaseapp.com",
  projectId: "database-c5a33",
  storageBucket: "database-c5a33.appspot.com",
  messagingSenderId: "772762422504",
  appId: "1:772762422504:web:ac5d28a27fe043e7e24d5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);