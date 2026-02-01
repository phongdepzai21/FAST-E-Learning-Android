
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKEdD3JFVfk7jW7Uzj-1D-T-zhPXm8XsQ",
  authDomain: "fast-elearning.firebaseapp.com",
  projectId: "fast-elearning",
  storageBucket: "fast-elearning.firebasestorage.app",
  messagingSenderId: "546323077937",
  appId: "1:546323077937:web:390cc8e4468e1f5518ae10",
  measurementId: "G-1TTQYS1K8Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const loginWithEmail = (email: string, pass: string) => 
  signInWithEmailAndPassword(auth, email, pass);

export const registerWithEmail = (email: string, pass: string) => 
  createUserWithEmailAndPassword(auth, email, pass);

export const logoutUser = () => signOut(auth);

export { onAuthStateChanged };
export type { User };
