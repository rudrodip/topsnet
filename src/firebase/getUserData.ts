import { db } from "./config";
import { doc, getDoc } from 'firebase/firestore'
import { User } from "firebase/auth";

interface UserData{
  liked: number[],
  pinned: number[],
  recommended: number[],
  openaikey?: string,
  orcid?: string,
}

async function getUserData(user: User | null): Promise<UserData | null>{
  const ref = doc(db, `user/${user?.uid}`)
  const snapShot = await getDoc(ref)
  if (snapShot.exists()){
    return snapShot.data() as UserData
  } else {
    return null
  }
}

export { getUserData }