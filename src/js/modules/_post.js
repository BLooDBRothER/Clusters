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
    let isPostLoaded = false;
    let isUserPostLoaded = false;
    const getPosts = () => posts;
    const getPost = (postID) => posts[postID];
    const getIsPostLoaded = () => isPostLoaded;

    const setUserPostLoaded = (value) => isUserPostLoaded = value;
    const setPosts = (allPosts) => {posts = allPosts};

    const loadPost = () => {
        for(let postId in posts){
            const post = posts[postId]; 
            document.querySelector(".posts").appendChild(postTemplate(postId, post.title, post.description, post.link, post.tags, post.timestamp, post.author));
        }
        isPostLoaded = true;
    }

    const loadUserPost = () => {
        const userPost = user.getPosts();
        const myPostContainer = document.querySelector(".my-posts");
        if(Object.keys(userPost).length === 0){
            myPostContainer.innerHTML = "<h3>No Posts Yet Click Create Post to create post!!</h3>";
        }
        myPostContainer.removeChild(myPostContainer.lastChild);
        for(let postId in userPost){
            const post = userPost[postId]; 
            myPostContainer.appendChild(postTemplate(postId, post.getTitle(), post.getDescription(), post.getLink(), post.getTags(), post.getTimestamp(), post.getAuthor()));
        }
        isUserPostLoaded = true;
    }

    return {getPosts, getPost, getIsPostLoaded, setPosts, setUserPostLoaded, loadPost, loadUserPost}
}

export const allPosts = Posts();