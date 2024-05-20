import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXPKzYp1IJzZs7XRFcqs6v18U0SANsJlQ",
  authDomain: "auth-task-3255e.firebaseapp.com",
  projectId: "auth-task-3255e",
  storageBucket: "auth-task-3255e.appspot.com",
  messagingSenderId: "798031183072",
  appId: "1:798031183072:web:f0adf745fd29ea2975a485",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const imageDB = getStorage(app);
