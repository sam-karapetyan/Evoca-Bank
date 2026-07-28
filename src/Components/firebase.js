import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgitt4fPCHrlfNefPqaQH098tF5TL7syo",
  authDomain: "evoca-bank-28507.firebaseapp.com",
  projectId: "evoca-bank-28507",
  storageBucket: "evoca-bank-28507.firebasestorage.app",
  messagingSenderId: "702717978448",
  appId: "1:702717978448:web:d8001c4e4e9742f9ae6e55",
  measurementId: "G-BV3QS750T7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };