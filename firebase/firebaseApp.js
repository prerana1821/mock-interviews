// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTrwhMZp7SobKtYYwjj1iwFtkvqloYgP0",
  authDomain: "mocky-a72f9.firebaseapp.com",
  projectId: "mocky-a72f9",
  storageBucket: "mocky-a72f9.appspot.com",
  messagingSenderId: "807328499350",
  appId: "1:807328499350:web:42e68b4fbffca6f15ba4b7",
  measurementId: "G-RPG5Z9L07W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};

export const auth = getAuth();

// const analytics = getAnalytics(app);
