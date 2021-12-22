import { onAuthStateChanged } from "firebase/auth";
import { auth, login, logout } from "./modules/_login.js";
import { user } from "./modules/_user.js";

const loginBtn = document.querySelector(".login-btn");
const menuSection = document.querySelector(".menu");
const userInfoSection = document.querySelector(".user-info");

loginBtn.addEventListener("click", (e) => {
  if (!user.getLoggedInStatus()) {
    login();
  }
  // user.getLoggedInStatus() ? logout() : login();
});

// Update User data
function updateUserData() {
  user.getLoggedInStatus()
    ? (menuSection.classList.remove("none"), loginBtn.classList.add("none"))
    : (menuSection.classList.add("none"), loginBtn.classList.remove("none"));
  userInfoSection.querySelector(".user-name").innerText = user.getName();
  userInfoSection.querySelector(".user-profile-picture").src =
    user.getProfilPicUrl();
}

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    user.setInitial([
      firebaseUser.uid,
      firebaseUser.displayName,
      firebaseUser.photoURL,
    ]);
    updateUserData();
  } else {
    user.removeInitial();
    updateUserData();
  }
});
