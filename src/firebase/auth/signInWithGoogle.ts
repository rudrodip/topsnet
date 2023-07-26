import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config";
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    return { user }
  }).catch((error) => {
    return { error }
  });
};

export default signInWithGoogle