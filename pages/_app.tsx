import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { initFirebase, FirebaseApp } from "../firebase/firebase";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import SignInWithGoogle from "../components/signinwithgoogle";
import Head from "next/head";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const app: FirebaseApp = initFirebase();

  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        setUser(user);
        router.push("/dashboard");
      } else {
        // User is signed out
        console.log("User is signed out", app);
        setUser(null);
        router.push("/"); // Redirect to the home page if the user is signed out
      }
    });

    return () => unsubscribe();
  }, []);

  const isFirstPage: boolean = router.pathname === "/";

  return (
    <>
      <div>
        {/* Render the current page component */}

        <Component {...pageProps} />

        {/* Render the sign-in component on the first page */}
        {isFirstPage && !user && <SignInWithGoogle onSignIn={setUser} />}
      </div>
    </>
  );
}

export default MyApp;
