import { changePath, tabMap } from "./modules/_url_handler";
import { user } from "./modules/_user";

const userPostBtn = document.querySelector(".my-posts-tab");
const userBookmarkBtn = document.querySelector(".bookmark-tab");

userPostBtn.addEventListener("click", toggleUserPostView);
userBookmarkBtn.addEventListener("click", toggleBookmarkPostView);


function toggleUserPostView(e){
    e.preventDefault();
    // console.log(user.getCurrentPage());
    // tabMap[user.getCurrentPage()] && tabMap[user.getCurrentPage()].click();
    if(user.getCurrentPage() === "myposts"){
        updateUserPostCotainer(0);
        changePath("");
    }
    else{
        updateUserPostCotainer(1);
        changePath("myposts");
    }
}

function toggleBookmarkPostView(e){
    e.preventDefault();
    if(user.getCurrentPage() === "bookmarks"){
        updateBookmarkPostCotainer(0);
        changePath("");
    }
    else{
        updateBookmarkPostCotainer(1);
        changePath("bookmarks");
    }
}

function updateUserPostCotainer(isToggleOn){
    const userPostContainer = document.querySelector(".my-posts");
    const postContainer = document.querySelector(".posts");
    const postContainerTitle = document.querySelector(".posts-conatiner-title");
    if(isToggleOn){
        postContainerTitle.innerText = "My Posts"
        userPostContainer.classList.remove("none");
        postContainer.classList.add("none");
    }
    else{
        postContainerTitle.innerText = "All Posts"
        userPostContainer.classList.add("none");
        postContainer.classList.remove("none");
    }
}
function updateBookmarkPostCotainer(isToggleOn){
    const userPostContainer = document.querySelector(".bookmark-posts");
    const postContainer = document.querySelector(".posts");
    const postContainerTitle = document.querySelector(".posts-conatiner-title");
    if(isToggleOn){
        postContainerTitle.innerText = "My Bookmarks"
        userPostContainer.classList.remove("none");
        postContainer.classList.add("none");
    }
    else{
        postContainerTitle.innerText = "All Posts"
        userPostContainer.classList.add("none");
        postContainer.classList.remove("none");
    }
}