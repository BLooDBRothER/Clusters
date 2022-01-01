import { user } from "./modules/_user";
import { tabMap } from "./modules/_url_handler";

function goToHomePage(){
    tabMap[user.getCurrentPage()].click();
}

window.addEventListener("popstate", (e) => {
    console.log(e.state);
    if(!e.state?.pathName) {
        goToHomePage();
        return;
    }
    tabMap[user.getCurrentPage()].click();
    tabMap[e.state.pathName].click();
});

window.addEventListener("DOMContentLoaded", () => {
    let tabPath = window.location.pathname.replace(/\//gi, "");
    if(!tabPath) return;
    tabMap[tabPath].click();
});