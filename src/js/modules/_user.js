import { readDB, updateDB } from "./_database";
import { allPosts, Post } from "./_post";

export function User(uid='', name='', profilePicUrl='', isLoggedIn=true, bio = "None", posts = {}, currentPage="", bookmarkes = {}) {
    //Getter
    const getUid = () => uid;
    const getName = () => name;
    const getProfilPicUrl = () => profilePicUrl;
    const getLoggedInStatus = () => isLoggedIn;
    const getBio = () => bio;
    const getPosts = () => posts;
    const getCurrentPage = () => currentPage;
    const getBookmark = (postId) => bookmarkes[postId];
    const getBookmarks = () => bookmarkes;

    const addPostToBookmark = (postId) => {
        const bookmarkObj = {};
        const ref = `user-bookmarks/${uid}/${postId}`;
        // if(bookmarkes[postId]){
        //     bookmarkObj[ref] = null;
        //     delete bookmarkes[postId];
        // }
        // else{
        //     bookmarkObj[ref] = bookmarkes[postId] = true;
        // }
        bookmarkObj[ref] = bookmarkes[postId] ? null : true;
        console.log(bookmarkObj)
        updateDB(bookmarkObj);
        return bookmarkObj[ref];
    }
  
    //Setter 
    const setCurrentPage = (pagePath) => currentPage = pagePath;
    const setBio = (userBio) => bio = userBio; 
    const setPost = (postID, postObject) => posts[postID] = postObject;
    const setLoggedInStatus = (status) => isLoggedIn = status;
    const setBookmark = (postId) => bookmarkes[postId] = true;
    const deleteBookmark = (postID) => delete bookmarkes[postID];
    const setInitial = async ([...userData]) => {
        uid = userData[0];
        name = userData[1];
        profilePicUrl = userData[2];
        setLoggedInStatus(true);
        await setPosts();
        await setBookmarksFromDB();
    };
    const removeInitial = () => {uid = ''; name = ''; profilePicUrl = ''; setLoggedInStatus(false)};

    const setPosts = async ()=>{
        const userPostsID = (await readDB(`user-posts/${getUid()}`)).val();
        for(let userPostID in userPostsID){
            const eachUserPost = allPosts.getPost(userPostID);
            const postObject = Post(userPostID, eachUserPost.title, eachUserPost.description, eachUserPost.link, eachUserPost.tags, eachUserPost.author, new Date(eachUserPost.timestamp));
            setPost(userPostID, postObject);
        }
    }

    const setBookmarksFromDB = async () => {
        const userBookmark = (await readDB(`user-bookmarks/${getUid()}`)).val();
        bookmarkes = userBookmark || {};
        console.log(bookmarkes);
    }
    
    const setBookmarks = (posts) => {
        bookmarkes = posts || {};
    }

    return { getUid, getName, getProfilPicUrl, getLoggedInStatus, getBio, getPosts, getCurrentPage, getBookmark, getBookmarks, setBio, setPosts, setLoggedInStatus, setInitial, setBookmarks, setBookmark, deleteBookmark, removeInitial, setCurrentPage, addPostToBookmark };
}

export const user = User();