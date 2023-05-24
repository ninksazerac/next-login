import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDo0t5cd2RpSlBeZHvWsLRhy3kjCMPS5qA",
    authDomain: "studious-apex-387709.firebaseapp.com",
    projectId: "studious-apex-387709",
    storageBucket: "studious-apex-387709.appspot.com",
    messagingSenderId: "808190896414",
    appId: "1:808190896414:web:74fbf0256259e406a3010f"
};

const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}
