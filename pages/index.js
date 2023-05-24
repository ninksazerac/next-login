import { initFirebase } from "../firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const app = initFirebase();
  console.log(app);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const signIn = () => {
            signInWithPopup(auth, provider)
            .then((result) => {
              const user = result.user;
              console.log('success', user);
              router.push('/dashboard');
            })
            .catch((error) => {
              console.log('error', error);
            });
           
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          // User is signed in
          console.log('success', result.user);
          router.push('/dashboard'); // Redirect to the dashboard page after successful sign-in
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <div>
      
      <button
        onClick={signIn}>
          Sign in with google
      </button>
    </div>
  )
}
export default Home;

// {/* {props.user ? (
//         <>
//           <span>Signed in as : {props.user.email}</span>
//           <button onClick={props.signOut}>Sign Out</button>
//         </>
//       ) : (
//         <button onClick={props.signIn}>Sign In</button>
//       )} */}