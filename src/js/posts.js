import { formTagTemplate } from "./modules/_template.js";

const tagArray = []

const createPostBtn = document.querySelector(".create-tab");
const createPostForm = document.querySelector(".new-post");
const tagsContainer = document.querySelector(".new-post-tags");
const tagInput = document.querySelector(".tag-input");

createPostBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createPostForm.classList.remove("none");
});

tagInput.addEventListener("keypress", addFormTag);

function addFormTag(e){
    if(e.key == "Enter"){
        e.preventDefault();
        if(tagArray.find(value => e.target.value === value)){
            e.target.value = '';
            return;
        }
        const tagValue = e.target.value;
        tagsContainer.appendChild(formTagTemplate(tagValue));
        tagArray.push(tagValue);
        tagsContainer.lastChild.querySelector(".tag-delete").addEventListener("click", removeFormTag);
        e.target.value = '';
    }
}

function removeFormTag(e){
    tagArray.splice(tagArray.findIndex(value => value === e.target.dataset.value), 1);
    tagsContainer.removeChild(e.target.parentNode);
}