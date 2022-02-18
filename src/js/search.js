import { allPosts } from "./modules/_post";

const serachInput = document.querySelector('.search-input');
// console.log("hel")
serachInput.addEventListener("input", (e) => {
    allPosts.searchPost(e.target.value);
});