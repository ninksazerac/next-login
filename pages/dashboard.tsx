import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");

        window.grecaptcha.render("recaptcha-container", {
          sitekey: "6LcO_komAAAAAG_nAU7L846UqCS9feqH9HIXTrJX",
          size: "invisible",
          callback: (reCAPTCHAToken: string) => {
            console.log("reCAPTCHA token:", reCAPTCHAToken);
            // You can handle the token exchange or other logic here
          },
        });

        setTimeout(() => {
          window.grecaptcha.execute("6LcO_komAAAAAG_nAU7L846UqCS9feqH9HIXTrJX", {
            action: "SIGN_OUT",
          });
          router.push("/");
        }, 10000); // Delay the redirection by 10 seconds (adjust the duration as needed)
      })
      .catch((error) => {
        console.log("Error occurred during sign out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("User is signed out");
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ul className="row">
      <Link href='/provider'>
        Provider
      </Link>
      <Link href='/transaction'>
        Transaction
      </Link>
      <Link href='/service'>
        Service
      </Link>
      </ul>
      {user && (
        <div>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <button onClick={handleSignOut}>Sign Out</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Dashboard;
