import { user } from "./_user";

export const tabMap = {
    new: document.querySelector(".create-tab"),
    myposts: document.querySelector(".my-posts-tab"),
    bookmarks: document.querySelector(".bookmark-tab")
}

export const changePath = (pathName) => {
    user.setCurrentPage(pathName);
    if(!pathName) return;
    window.history.pushState({pathName}, null, `/${pathName}`);
}