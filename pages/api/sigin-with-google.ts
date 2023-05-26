import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { idToken } = req.body;

  try {
    // Make the necessary requests to verify and handle the Google sign-in token
    // Replace this code with your actual implementation

    // Example: Verify the ID token using Google's tokeninfo endpoint
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`); //Header
    const { sub, email, name } = response.data;

    // Handle the user data or perform any other necessary operations
    // Return a response indicating success or failure

    res.status(200).json({ success: true, userId: sub, email, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to sign in with Google" });
  }
}
