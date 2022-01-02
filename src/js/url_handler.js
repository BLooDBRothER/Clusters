import { user } from "./modules/_user";
import { changePath, tabMap } from "./modules/_url_handler";

export const postConatiner = {
    home: document.querySelector(".all-posts"),
    myposts: document.querySelector(".my-posts"),
    bookmarks: document.querySelector(".bookmark-posts"),
    new: document.querySelector(".new-post")
}

window.addEventListener("popstate", (e) => {
    tabMap[e.state?.pathName] ? tabMap[e.state.pathName].click() : enableAllPostCotainer();
});

window.addEventListener("DOMContentLoaded", () => {
    let tabPath = detectTabPath();
    if(!tabPath) return;
    tabMap[tabPath].click();
});

export function disablePostContainer(){
    const containerToHide = postConatiner[user.getCurrentPage()] || postConatiner["home"];
    console.log(containerToHide);
    containerToHide.classList.add("none");
}


function enableAllPostCotainer(){
    disablePostContainer();
    const allPostContainer = document.querySelector(".all-posts");
    const postContainerTitle = document.querySelector(".posts-conatiner-title");

    postContainerTitle.innerText = "All Posts"
    allPostContainer.classList.remove("none");
    changePath("");
}

export function detectTabPath(){
    const tabPath = window.location.pathname.replace(/\//gi, "");
    return tabPath;
}