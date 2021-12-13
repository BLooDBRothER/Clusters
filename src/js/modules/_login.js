import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const login = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log(user);
  }).catch(error => {});
};

export const logout = () => {
  signOut(auth).then(() => {}).catch((error) => {});
}