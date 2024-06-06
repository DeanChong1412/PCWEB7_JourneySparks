// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUaiyXU6phyxFVkT11SBNIXWHY00r2SXg",
  authDomain: "pcweb7---journeysparks.firebaseapp.com",
  projectId: "pcweb7---journeysparks",
  storageBucket: "pcweb7---journeysparks.appspot.com",
  messagingSenderId: "1048953364217",
  appId: "1:1048953364217:web:69999b05e8b73466a10c28"
};

// Initialize 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);