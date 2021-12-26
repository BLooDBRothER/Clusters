import { getDatabase, set, ref, get, push, update } from "firebase/database";
import { app } from "./firebase_credential.js";

const database = getDatabase(app);

export function writeDB(reference, data){
    set(ref(database, reference), data)
}

export function updateDB(updateData){
    update(ref(database), updateData);
}

export async function readDB(reference){
    return await get(ref(database, reference));
}

export function getPostId(reference){
    return push(ref(database, reference)).key;
}