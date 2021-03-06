import { onAuthStateChanged } from "firebase/auth";
import { auth, login, logout } from "./modules/_login.js";
import { user } from "./modules/_user.js";
import { readDB, writeDB } from "./modules/_database.js";
import { allPosts } from "./modules/_post.js";
import { detachBookmarkListener, initializeBookmarkListener } from "./modules/_bookmark.js";
import { detachUserPostListener, initializeUserPostListener } from "./modules/_user_post_loader.js";

const loginBtn = document.querySelector(".login-btn");
const menuSection = document.querySelector(".menu");
const userInfoSection = document.querySelector(".user-info");
const profilePicTag = userInfoSection.querySelector(".user-profile-picture");


loginBtn.addEventListener("click", (e) => {
  if (!user.getLoggedInStatus()) {
    login();
  }
  // user.getLoggedInStatus() ? logout() : login();
});

// Update User data in DataBase
async function updateUserDataBase(){
  const dbData = await readDB(`users/${user.getUid()}`);
  if(dbData.exists()) return;
  const temporaryUserData = {
    name: user.getName(),
    profilePic: user.getProfilPicUrl(),
    bio: user.getBio(),
  }
  writeDB(`users/${user.getUid()}`, temporaryUserData);
}

// Update User data Locally
function updateUserData(){
  user.getLoggedInStatus() 
   ? (menuSection.classList.remove("none"), loginBtn.classList.add("none"), profilePicTag.addEventListener("click", logout))
   : (menuSection.classList.add("none"), loginBtn.classList.remove("none"), profilePicTag.removeEventListener("click", logout));
  userInfoSection.querySelector(".user-name").innerText = user.getName();
  profilePicTag.src =
    user.getProfilPicUrl();
}

function clearUserPost(){
  document.querySelector(".my-posts").innerHTML = "<h3>Please Login to see you feed!!!</h3>";
}

function initializeListener(){
  initializeUserPostListener();
  initializeBookmarkListener();
}

function detachListener(){
  detachBookmarkListener();
  detachUserPostListener();
}

onAuthStateChanged(auth, async (firebaseUser) => {
  const postsFromDB = (await readDB(`posts`)).val();
  if(postsFromDB){
    allPosts.setPosts(postsFromDB);
  }
  if (firebaseUser) {
    await user.setInitial([
      firebaseUser.uid,
      firebaseUser.displayName,
      firebaseUser.photoURL,
    ]);
    initializeListener();
    updateUserData();
    updateUserDataBase();
    // allPosts.loadUserPost();
  }
  else{
    detachListener();
    user.removeInitial();
    updateUserData(); 
    clearUserPost();   
  }
  allPosts.loadPost();
});
