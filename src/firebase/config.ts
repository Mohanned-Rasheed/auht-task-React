import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXPKzYp1IJzZs7XRFcqs6v18U0SANsJlQ",
  authDomain: "auth-task-3255e.firebaseapp.com",
  projectId: "auth-task-3255e",
  storageBucket: "auth-task-3255e.appspot.com",
  messagingSenderId: "798031183072",
  appId: "1:798031183072:web:f0adf745fd29ea2975a485",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
