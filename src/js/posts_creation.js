import { getPostId, updateDB, writeDB } from "./modules/_database.js";
import { Post } from "./modules/_post.js";
import { formTagTemplate } from "./modules/_template.js";
import { changePath } from "./modules/_url_handler.js";
import { user } from "./modules/_user.js";
import { detectTabPath } from "./url_handler.js";

let tagArray = [];

const createPostTabBtn = document.querySelector(".create-tab");
const createPostForm = document.querySelector(".new-post");
const tagsContainer = document.querySelector(".new-post-tags");
const tagInput = document.querySelector(".tag-input");
const createPostBtn = document.querySelector(".creat-post-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const postDetailsInput = {
    title: document.querySelector(".new-post-input[data-name='title']"),
    description : document.querySelector(".new-post-textarea[data-name='description']"),
    link : document.querySelector(".new-post-input[data-name='link']")
}

createPostTabBtn.addEventListener("click", creatPostFormToggle);

tagInput.addEventListener("keypress", addFormTag);

createPostBtn.addEventListener("click", creatPost);

function creatPostFormToggle(e){
    e.preventDefault();
    createPostForm.classList.remove("none");
    detectTabPath() === "new" ? user.setCurrentPage("new") : changePath("new");
}

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

function creatPost(e){
    e.preventDefault();
    if(!checkInputValuePresent()) return;
    const id = getPostId(`posts`);
    const title = postDetailsInput.title.value;
    const description = postDetailsInput.description.value;
    const link = postDetailsInput.link.value;
    const newPost = Post(id, title, description, link, tagArray, user.getName());
    writeDB(`posts/${id}`, newPost.getAsObject());
    updatePostToDatabase(newPost);
    clearAndHideCreatePostForm();
}

function updatePostToDatabase(postObject){
    writeDB(`posts/${postObject.getID()}`, postObject.getAsObject());
    updateDB(postObject.getIDAsObject(user.getUid()));
}

function checkInputValuePresent(){
    let isAllValueFilled = true;
    for(let input in postDetailsInput){
        if(postDetailsInput[input].value.length === 0){
            isAllValueFilled = false;
            postDetailsInput[input].style.borderColor = "red";
        }
    }
    if(!isAllValueFilled) setTimeout(removeInputErroColor, 2000);
    return isAllValueFilled;
}

function removeInputErroColor(){
    for(let input in postDetailsInput){
        postDetailsInput[input].style.borderColor = "#bb86fc";
    }
}

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearAndHideCreatePostForm();
});

function clearAndHideCreatePostForm(){
    tagArray = [];
    for(let input in postDetailsInput){
        postDetailsInput[input].value = "";
    }
    tagsContainer.innerHTML = '';
    history.back();
}