import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "countries-ae40c.firebaseapp.com",
  projectId: "countries-ae40c",
  storageBucket: "countries-ae40c.appspot.com",
  messagingSenderId: "513123725759",
  appId: "1:513123725759:web:b1221f6501bd9095c7b10a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Here we get access to the project authentification
const auth = getAuth(app);
// Here we get access to the project database
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
    console.log(error);
    alert(error.message);
  }
};

export { auth, db, registerWithEmailAndPassword };
