import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBeKgZ3-RAOu9ojFJQ1IwI9QJNvpBh0fGo",
  authDomain: "to-doapp-6559c.firebaseapp.com",
  projectId: "to-doapp-6559c",
  storageBucket: "to-doapp-6559c.firebasestorage.app",
  messagingSenderId: "308318286614",
  appId: "1:308318286614:web:3ff098c97a46aa1bd29637"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db = getFirestore(app);
export default app;

