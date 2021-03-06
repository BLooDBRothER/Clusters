import { bookmarkFunction } from "./_bookmark";
import { postTemplate } from "./_template";
import { user } from "./_user";

export function Post(id, title, description, link, tags, author, timestamp=Date.now()){
    // getter
    const getID = () => id;
    const getTitle = () => title;
    const getDescription = () => description;
    const getLink = () => link;
    const getTags = () => tags;
    const getTimestamp = () => timestamp;
    const getAuthor = () => author;
    const getAsObject = () => {
        return {
            title: getTitle(),
            description: getDescription(),
            link: getLink(),
            tags: getTags(),
            author: getAuthor(),
            timestamp: getTimestamp()
        }
    }
    const getIDAsObject = (userID) => {
        const userPost = {}; 
        userPost[`user-posts/${userID}/${getID()}`] = true;
        return userPost; 
    }

    // setter
    const setID = (idValue) => id = idValue;
    const setTitle = (titleValue) => title = titleValue;
    const setDescription = (descriptionValue) => description = descriptionValue;
    const setLink = (linkValue) => link = linkValue;
    const setTags = (tagsValue) => tags = tagsValue;
    const setTimestamp = (timestampValue) => timestamp = timestampValue;
    const setAuthor = (authorValue) => authorValue = author;

    return {getID, getTitle, getDescription, getLink, getTags, getTimestamp, getAuthor, getAsObject, getIDAsObject, setID, setAuthor, setTags, setTitle, setDescription, setLink, setTimestamp};
}

export function Posts(posts={}){
    let filteredPost;
    const getPosts = () => posts;
    const getPost = (postID) => posts[postID];

    const setPosts = (allPosts) => {posts = filteredPost = allPosts};

    const loadPost = () => {
        const postConatiner = document.querySelector(".posts"); 
        postConatiner.innerHTML = '';
        for(let postId in filteredPost){
            const post = posts[postId];
            postConatiner.appendChild(postTemplate(postId, post.title, post.description, post.link, post.tags, post.timestamp, post.author, user.getBookmark(postId)));
            postConatiner.lastChild.querySelector(".post-bookmark").addEventListener("click", bookmarkFunction);
        }
    }

    const searchPost = (key) => {
        if(key === ''){
            filteredPost = posts;
            loadPost();
            return;
        }
        filteredPost = {};
        for(let postId in posts){
            const post = posts[postId];
            const re = new RegExp(key, 'gi');
            if(post.title.match(re)){
                filteredPost[postId] = post;
            }
        }
        loadPost();
    }

    const loadUserPost = () => {
        const userPost = user.getPosts();
        const myPostContainer = document.querySelector(".my-posts");
        myPostContainer.innerHTML = "<h3>No Posts Yet Click Create Post to create post!!</h3>";
        if(Object.keys(userPost).length === 0){
            return;
        }
        myPostContainer.removeChild(myPostContainer.lastChild);
        for(let postId in userPost){
            const post = userPost[postId]; 
            myPostContainer.appendChild(postTemplate(postId, post.getTitle(), post.getDescription(), post.getLink(), post.getTags(), post.getTimestamp(), post.getAuthor(), user.getBookmark(postId)));
        }
    }

    const loadBookmarkedPost = () => {
        const bookmarkedPost = user.getBookmarks();
        const bookmarkPostContainer = document.querySelector(".bookmark-posts");
        bookmarkPostContainer.innerHTML = "<h3>No Bookmarked Posts!!</h3>";
        if(Object.keys(bookmarkedPost).length === 0){
            return;
        }
        bookmarkPostContainer.removeChild(bookmarkPostContainer.lastChild);
        for(let postId in bookmarkedPost){
            const post = allPosts.getPost(postId); 
            bookmarkPostContainer.appendChild(postTemplate(postId, post.title, post.description, post.link, post.tags, post.timestamp, post.author, user.getBookmark(postId)));
        }
    }
    return {getPosts, getPost, setPosts, loadPost, loadUserPost, loadBookmarkedPost, searchPost}
}

export const allPosts = Posts();