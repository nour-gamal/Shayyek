import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ-Jx7GBw_9dc56LOXfwefsZF05H-PjEg",
  authDomain: "shayyak-bb325.firebaseapp.com",
  projectId: "shayyak-bb325",
  storageBucket: "shayyak-bb325.appspot.com",
  messagingSenderId: "429766207084",
  appId: "1:429766207084:web:27e4304d12727014711a49",
  measurementId: "G-ZPFZ37KM5G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
