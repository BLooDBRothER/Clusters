import { off, onValue, ref } from "firebase/database";
import { user } from "./_user.js";
import { database } from "./_database.js";

export function initializeUserPostListener(){
        const userPostRef = ref(database, `user-posts/${user.getUid()}`);
        onValue(userPostRef, user.setPosts);

}

export function detachUserPostListener(){
    const userPostRef = ref(database, `user-posts/${user.getUid()}`);
    off(userPostRef);
}