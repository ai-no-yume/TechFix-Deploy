import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCkshAXNs-l9ffPQzpk_43pre_R2xuf3Cw",
    authDomain: "techfix-acc81.firebaseapp.com",
    projectId: "techfix-acc81",
    storageBucket: "techfix-acc81.appspot.com",
    messagingSenderId: "1055442760498",
    appId: "1:1055442760498:web:861f114b5e5a226f9b1d2b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;
