import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYi_9TZDvb5ITzzWb8WiNVEvKB9PT8OE4",
  authDomain: "mocky-5f180.firebaseapp.com",
  projectId: "mocky-5f180",
  storageBucket: "mocky-5f180.appspot.com",
  messagingSenderId: "208759955378",
  appId: "1:208759955378:web:2585068e14358843fbceab",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
