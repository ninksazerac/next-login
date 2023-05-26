import { initializeApp, FirebaseApp  } from "firebase/app";
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// <script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld61jkmAAAAAKW8irB84BrU4NDFlRIS1uT01W84"></script>

const firebaseConfig = {
  apiKey: "AIzaSyCwNbHdN0QhxeXD2vQP84kcbcCKmB-_gSc",
  authDomain: "bills-697a8.firebaseapp.com",
  projectId: "bills-697a8",
  storageBucket: "bills-697a8.appspot.com",
  messagingSenderId: "514200363050",
  appId: "1:514200363050:web:8432983aba6d1af62c6353"
};

// web clinet id = 671360097728-joovbfjbdo7f4ck8e25fe1ocnq48seoq.apps.googleusercontent.com

export const app: FirebaseApp = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaEnterpriseProvider('6Ld61jkmAAAAAKW8irB84BrU4NDFlRIS1uT01W84'),
//     isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
//   });


export const initFirebase = (): FirebaseApp => {
  return app;
};

export type { FirebaseApp };
