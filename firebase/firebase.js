import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD9owP02L5dz8nVGtoF6syrCXgQa2HIIbA",
    authDomain: "nextjs-test-fd2fb.firebaseapp.com",
    projectId: "nextjs-test-fd2fb",
    storageBucket: "nextjs-test-fd2fb.appspot.com",
    messagingSenderId: "195451219725",
    appId: "1:195451219725:web:0aea1a23f38f5a145e0a44",
    measurementId: "G-4ZKEVS0QKB"
};

const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}
