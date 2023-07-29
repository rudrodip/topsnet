import { User } from "firebase/auth";
import { updateUserData } from "./createUserData";
import { arrayUnion, arrayRemove } from "firebase/firestore";

function addLike(user: User | null, id: number){
  updateUserData(user, {liked: arrayUnion(id)})
    .then(_ => console.log("updated"))
    .catch(err => console.log(err))
}

function addPinned(user: User | null, id: number){
  updateUserData(user, {pinned: arrayUnion(id)})
    .then(_ => console.log("updated"))
    .catch(err => console.log(err))
}

function removeLike(user: User | null, id: number){
  updateUserData(user, {liked: arrayRemove(id)})
    .then(_ => console.log("updated"))
    .catch(err => console.log(err))
}


function removePinned(user: User | null, id: number){
  updateUserData(user, {pinned: arrayRemove(id)})
    .then(_ => console.log("updated"))
    .catch(err => console.log(err))
}



export { addLike, removeLike, addPinned, removePinned }