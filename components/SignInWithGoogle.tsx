import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { useRouter } from "next/router";
import Image from 'next/image'
import { Button } from 'react-bootstrap';

import axios from 'axios';

import styles from '../styles/signin.module.css';
import bgrabbit from '../public/Rabbit 2D_SVG.svg';
import logogoogle from '../public/Google Logo.svg';


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
      setError(error);
    }
  };

  return (
    
    <div className={styles.container}>
      <div className={styles.bgrabbit}>
        <svg className="svg-icon" viewBox="0 0 24 24">
          <path fill="currentColor"/>
        </svg>
      </div>
      <div className={`card ${styles.card}`}>
        <div className={`card-body ${styles.cardBody}`}>
        <h5 className={`card-title ${styles.cardTitle}`}>BILL PAYMENT GATEWAY
        </h5>
        <Button
          variant="light"
          className={`btn btn-block btn-google ${styles.button}`}
          onClick={signIn}
        >
          
          <Image className="w-20 h-20 me-2" src={logogoogle} alt={"icon"}></Image>
          <span className={`text ${styles.buttonText}`}>Sign in with Google</span>
          
        </Button>
        
        </div>
      </div>
      
    </div>
  );
};

export default SignInWithGoogle;

