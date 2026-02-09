
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKEdD3JFVfk7jW7Uzj-1D-T-zhPXm8XsQ",
  authDomain: "fast-elearning.firebaseapp.com",
  projectId: "fast-elearning",
  storageBucket: "fast-elearning.firebasestorage.app",
  messagingSenderId: "546323077937",
  appId: "1:546323077937:web:390cc8e4468e1f5518ae10",
  measurementId: "G-1TTQYS1K8Z"
};

// Khởi tạo Firebase App một lần duy nhất
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Xuất các dịch vụ
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithEmail = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
export const registerWithEmail = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
export const logoutUser = () => signOut(auth);

export const getUserProfile = async (uid: string) => {
  if (!uid) return null;
  const userRef = doc(db, "users", uid);
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      const defaultProfile = {
        plan: 'Standard',
        points: 0,
        completedCourses: 0,
        isVIP: false,
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, defaultProfile);
      return defaultProfile;
    }
  } catch (error) {
    console.warn("Lỗi tải profile:", error);
    return { plan: 'Standard', points: 0, completedCourses: 0, isVIP: false };
  }
};

export { onAuthStateChanged };
export type { User };
