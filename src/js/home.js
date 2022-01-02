import { changePath } from "./modules/_url_handler";
import { user } from "./modules/_user";
import { detectTabPath, disablePostContainer } from "./url_handler";

const userPostBtn = document.querySelector(".my-posts-tab");
const userBookmarkBtn = document.querySelector(".bookmark-tab");

userPostBtn.addEventListener("click", enableUserPostCotainer);
userBookmarkBtn.addEventListener("click", enableBookmarkPostCotainer);

function enableUserPostCotainer(e){
    e.preventDefault();
    disablePostContainer();
    const userPostContainer = document.querySelector(".my-posts");
    const postContainerTitle = document.querySelector(".posts-conatiner-title");

    postContainerTitle.innerText = "My Posts"
    userPostContainer.classList.remove("none");
    detectTabPath() === "myposts" ? user.setCurrentPage("myposts") : changePath("myposts");
}

function enableBookmarkPostCotainer(e){
    e.preventDefault();
    disablePostContainer();
    const userPostContainer = document.querySelector(".bookmark-posts");
    const postContainerTitle = document.querySelector(".posts-conatiner-title");
    
    postContainerTitle.innerText = "My Bookmarks"
    userPostContainer.classList.remove("none");
    detectTabPath() === "bookmarks" ? user.setCurrentPage("bookmarks") : changePath("bookmarks");
}
