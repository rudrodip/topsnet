import { User } from "firebase/auth";
import { db } from "./config";
import { doc, setDoc, updateDoc } from "firebase/firestore";

async function createUserData(user: User | null, data: Partial<JSON>) {
  if (!user) return;
  const userRef = doc(db, `user/${user.uid}`);
  try {
      setDoc(userRef, data);
  } catch (error) {
      console.log(error)
  }
}

async function updateUserData(user: User | null, dataToUpdate: Partial<JSON>) {
  if (!user) return;
  
  try {
    const userRef = doc(db, `user/${user.uid}`);
    await setDoc(userRef, dataToUpdate, { merge: true });
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

export { createUserData, updateUserData }