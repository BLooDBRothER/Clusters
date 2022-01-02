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
        if(!isLoggedIn) return;
        const bookmarkObj = {};
        const ref = `user-bookmarks/${uid}/${postId}`;
        bookmarkObj[ref] = bookmarkes[postId] ? null : true;
        updateDB(bookmarkObj);
        return bookmarkObj[ref];
    }

    const clearBookmark = () => {
        bookmarkes = {};
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
        // await setPosts();
        await setBookmarksFromDB();
    };
    const removeInitial = () => {uid = ''; name = ''; profilePicUrl = ''; setLoggedInStatus(false); clearBookmark()};

    let initialFetch = true;
    const setPosts = async (data) => {
        if(!initialFetch){
            const postsFromDB = (await readDB(`posts`)).val();
            if(postsFromDB){
                allPosts.setPosts(postsFromDB);
                allPosts.loadPost();
            }
        }
        console.log(data.val());
        const userPostsID = data.val();
        for(let userPostID in userPostsID){
            const eachUserPost = allPosts.getPost(userPostID);
            const postObject = Post(userPostID, eachUserPost.title, eachUserPost.description, eachUserPost.link, eachUserPost.tags, eachUserPost.author, new Date(eachUserPost.timestamp));
            setPost(userPostID, postObject);
        }
        allPosts.loadUserPost();
        initialFetch = false;
    }

    const setBookmarksFromDB = async () => {
        const userBookmark = (await readDB(`user-bookmarks/${getUid()}`)).val();
        bookmarkes = userBookmark || {};
    }
    
    const setBookmarks = (posts) => {
        bookmarkes = posts || {};
    }

    return { getUid, getName, getProfilPicUrl, getLoggedInStatus, getBio, getPosts, getCurrentPage, getBookmark, getBookmarks, setBio, setPosts, setLoggedInStatus, setInitial, setBookmarks, setBookmark, deleteBookmark, removeInitial, setCurrentPage, addPostToBookmark };
}

export const user = User();