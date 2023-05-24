import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

const SignInWithGoogle = ({ onSignIn }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const router = useRouter();
  
    const signIn = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          // console.log("success", user);
          onSignIn(user);
          router.push("/dashboard");
        })
        .catch((error) => {
          // console.log("error", error);
        });
    };
    return (
        <div>
          <button onClick={signIn}>Sign in with Google</button>
        </div>
      );
};
export default SignInWithGoogle;