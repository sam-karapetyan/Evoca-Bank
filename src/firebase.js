import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgitt4fPCHrlfNefPqaQH098tF5TL7syo",
  authDomain: "evoca-bank-28507.firebaseapp.com",
  databaseURL: "https://evoca-bank-28507-default-rtdb.firebaseio.com",
  projectId: "evoca-bank-28507",
  storageBucket: "evoca-bank-28507.firebasestorage.app",
  messagingSenderId: "702717978448",
  appId: "1:702717978448:web:d8001c4e4e9742f9ae6e55",
  measurementId: "G-BV3QS750T7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);