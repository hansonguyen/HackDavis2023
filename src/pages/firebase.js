import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4Pr1-JjmDrzv1hrBmhjSqlHhyoChNWzU",
  authDomain: "hackdavis2023-6a837.firebaseapp.com",
  projectId: "hackdavis2023-6a837",
  storageBucket: "hackdavis2023-6a837.appspot.com",
  messagingSenderId: "305948259861",
  appId: "1:305948259861:web:0aa500c4cb2c5e3d86001c",
  measurementId: "G-NR8GYPLX2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)