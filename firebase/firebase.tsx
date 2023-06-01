import { initializeApp, FirebaseApp  } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAOdvRFxrjJ3zvhV2wyedDYahG-reHw_So",
  authDomain: "sign-in-eceb3.firebaseapp.com",
  projectId: "sign-in-eceb3",
  storageBucket: "sign-in-eceb3.appspot.com",
  messagingSenderId: "671360097728",
  appId: "1:671360097728:web:41e517e5abd2c8a4e8bc25"
};

export let app: FirebaseApp | null = null;
export let auth: Auth | null = null;

export const initFirebase = (): FirebaseApp => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    if (typeof window !== "undefined") {
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider('6LcO_komAAAAAG_nAU7L846UqCS9feqH9HIXTrJX'),
        isTokenAutoRefreshEnabled: true,
        
      });
    }
  }
  return app;
};

export type { FirebaseApp };

export const listenForAuthChanges = (callback: (user: User | null) => void) => {
  if (auth) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }
};
