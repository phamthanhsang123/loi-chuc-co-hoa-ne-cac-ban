import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNjeDerPH-hMfI3Dt0_Mx4VcFI3Bo0Tww",
    authDomain: "loi-chuc-co-hoa.firebaseapp.com",
    projectId: "loi-chuc-co-hoa",
    storageBucket: "loi-chuc-co-hoa.firebasestorage.app",
    messagingSenderId: "35913133926",
    appId: "1:35913133926:web:e3c2842671b65906e222a7",
    measurementId: "G-3MWLFT2T48"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
