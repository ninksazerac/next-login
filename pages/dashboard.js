import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import app from '../firebase/firebase';



const Dashboard = () => {

    const auth = getAuth(app);
    const router = useRouter();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Successfully signed out");
                router.push("/");
            })
            .catch((error) => {
                console.log("Error occurred during sign out:", error);
            });
      };

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          console.log("User is signed in:", user);
        } else {
          // User is signed out
          console.log("User is signed out");
          router.push("/"); // Redirect to the home page if the user is signed out
        }
      });

    return(
        <div>
            <Head>
            <title>Create Next App</title>
            </Head>
            <h1>halo</h1>
            <button
                onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    );
}
export default Dashboard;