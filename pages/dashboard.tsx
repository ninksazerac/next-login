import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/router";
import { app } from '../firebase/firebase';
import { useState, useEffect } from "react";



const Dashboard = () => {

    const auth = getAuth(app);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    // const [imageUrl, setImageUrl] = useState<string | null>(null);
    // const transformedUrl = imageUrl !== null ? imageUrl : undefined;

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

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          // console.log("User is signed in:", user);
          setUser(user);
        } else {
          // User is signed out
          console.log("User is signed out");
          router.push("/"); // Redirect to the home page if the user is signed out
        }
      });
      return () => unsubscribe();
    }, []);

    return(
        <div>
            
            {user && (
              <div>
                {/* {transformedUrl && <img src={transformedUrl} alt="User Avatar" />} */}
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
              </div>
            )}

            <button
                onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    );
}
export default Dashboard;