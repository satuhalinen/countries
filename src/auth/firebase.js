import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "countries-ae40c.firebaseapp.com",
  projectId: "countries-ae40c",
  storageBucket: "countries-ae40c.appspot.com",
  messagingSenderId: "513123725759",
  appId: "1:513123725759:web:b1221f6501bd9095c7b10a",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    alert(error.message);
  }
};
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
  }
};

const logout = () => {
  auth.signOut();
};
export { auth, db, registerWithEmailAndPassword, logout };
