import { User } from "firebase/auth";
import { db } from "./config";
import { doc, setDoc, updateDoc, UpdateData, DocumentData } from "firebase/firestore";

async function createUserData(user: User | null, data: Partial<JSON>) {
  if (!user) return;
  const userRef = doc(db, `user/${user.uid}`);
  try {
      setDoc(userRef, data);
  } catch (error) {
      console.log(error)
  }
}

async function updateUserData(user: User | null, dataToUpdate: UpdateData<DocumentData>) {
  if (!user) return;
  
  try {
    const userRef = doc(db, `user/${user.uid}`);
    await updateDoc(userRef, dataToUpdate);
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

export { createUserData, updateUserData }