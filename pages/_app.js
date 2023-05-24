import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { initFirebase } from "../firebase/firebase";
import SignInWithGoogle from "../components/SignInWithGoogle";

function MyApp({ Component, pageProps }) {
  const app = initFirebase();
  
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        setUser(user);
      } else {
        // User is signed out
        console.log("User is signed out",app);
        setUser(null);
        router.push("/"); // Redirect to the home page if the user is signed out
      }
    });

    return () => unsubscribe();
  }, []);

  const isFirstPage = router.pathname === "/";

  return (
    <div>
      

      {/* Render the current page component */}
      <Component {...pageProps} />

      {/* Render the sign-in component on the first page */}
      {isFirstPage && !user && <SignInWithGoogle onSignIn={setUser} />}
    </div>
  );
}

export default MyApp;