import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAOdvRFxrjJ3zvhV2wyedDYahG-reHw_So",
    authDomain: "sign-in-eceb3.firebaseapp.com",
    projectId: "sign-in-eceb3",
    storageBucket: "sign-in-eceb3.appspot.com",
    messagingSenderId: "671360097728",
    appId: "1:671360097728:web:41e517e5abd2c8a4e8bc25"
};

const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}
