import { getDatabase, set, ref, get } from "firebase/database";
import { app } from "./firebase_credential.js";

const database = getDatabase(app);

export function writeDB(reference, data){
    set(ref(database, reference), data)
}

export async function readDB(reference){
    return await get(ref(database, reference));
}