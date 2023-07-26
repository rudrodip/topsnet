import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../config";
const provider = new FacebookAuthProvider();

const signInWithFB = async () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    return { user }
  }).catch((error) => {
    return { error }
  });
};

export default signInWithFB