import { GithubAuthProvider, signInWithPopup, UserCredential, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "../config";
const provider = new GithubAuthProvider();

const signInWithGithub = async () => {
  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user = result.user;
    const additionalUserInfo = getAdditionalUserInfo(result);
    const isNewUser = additionalUserInfo?.isNewUser || false;
    return { user, isNewUser };
  } catch (error) {
    return { error };
  }
};

export default signInWithGithub