
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
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
export const db = getFirestore(app);

// Khởi tạo Google Provider với các tham số tối ưu
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
  prompt: 'select_account'
});

/**
 * LƯU Ý QUAN TRỌNG ĐỂ FIX LỖI GOOGLE LOGIN:
 * 1. Truy cập Firebase Console -> Authentication -> Settings -> Authorized Domains.
 * 2. Thêm domain của trang web này (ví dụ: your-site.netlify.app) vào danh sách.
 * 3. Đảm bảo đã bật phương thức "Google" trong tab Sign-in method.
 */
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithEmail = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
export const registerWithEmail = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
export const logoutUser = () => signOut(auth);

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
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
};

export { onAuthStateChanged };
export type { User };
