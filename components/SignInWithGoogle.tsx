import { useState, useEffect } from "react";
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { useRouter } from "next/router";

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
  }
}

interface ReCaptchaInstance {
  execute: (siteKey: string, options: any) => Promise<string>;
  render: (container: string, options: any) => number;
}

const SignInWithGoogle = ({ onSignIn }: { onSignIn: (user: User) => void }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [recaptchaRendered, setRecaptchaRendered] = useState(false);

  useEffect(() => {
    const loadRecaptchaScript = async() => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6LcO_komAAAAAG_nAU7L846UqCS9feqH9HIXTrJX";
      
      const loadScriptPromise = new Promise<void>((resolve, reject) => {
        script.addEventListener("load",() => resolve());
        script.addEventListener("error",() =>  reject());
        
      })
        document.body.appendChild(script);
        await loadScriptPromise;
    };

    loadRecaptchaScript();
  }, []);

  const handleTokenExchange = async (idToken: string, reCAPTCHAToken: string) => {
    try {
      const response = await axios.post("/pages/api/signin-with-google", {
        idToken,
        reCAPTCHAToken,
      });

      if (response.data.success) {
        router.push("/dashboard");
      } else {
        setError("Failed to exchange token");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to exchange token");
    }
  };

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onSignIn(user);
      const idToken = await user.getIdToken();

      if (!recaptchaRendered) {
        window.grecaptcha.render("recaptcha-container", {
          sitekey: "6LcO_komAAAAAG_nAU7L846UqCS9feqH9HIXTrJX",
          size: "invisible",
          callback: async (reCAPTCHAToken: string) => {
            await handleTokenExchange(idToken, reCAPTCHAToken);
          },
        });
        setRecaptchaRendered(true);
      } else {
        const timeoutDuration = 10000; // Timeout duration in milliseconds (e.g., 10 seconds)
        const reCAPTCHATokenPromise = new Promise<string>((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error("reCAPTCHA execution timed out"));
          }, timeoutDuration);
  
          window.grecaptcha.execute("6LcO_komAAAAAG_nAU7L846UqCS9feqH9HIXTrJX", {
            action: "LOGIN"
          }).then((reCAPTCHAToken: string) => {
            clearTimeout(timeoutId);
            resolve(reCAPTCHAToken);
          }).catch((error: any) => {
            clearTimeout(timeoutId);
            reject(error);
          });
        });
  
        reCAPTCHATokenPromise.then((reCAPTCHAToken: string) => {
          handleTokenExchange(idToken, reCAPTCHAToken);
        }).catch((error: any) => {
          console.error(error);
          setError("reCAPTCHA execution failed");
        });
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setError("Sign in with Google failed");
    }
  };

  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
      {error && <p>{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignInWithGoogle;
