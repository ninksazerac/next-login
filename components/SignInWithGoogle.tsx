import { useState } from "react";
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider, User, UserCredential } from "firebase/auth";
import { useRouter } from "next/router";

const SignInWithGoogle = ({ onSignIn }: { onSignIn: (user: User) => void }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);


  const handleTokenExchange = async (idToken: string) => {
    try {
      const response = await axios.post(
        "<your-token-exchange-api-endpoint>", // Replace with your token exchange API endpoint
        { idToken }
      );
      console.log(response.data);
      
      
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

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        onSignIn(user);
        const idToken = await user.getIdToken();
        handleTokenExchange(idToken);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setError("Sign in with Google failed");
      });
  };

  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInWithGoogle;
