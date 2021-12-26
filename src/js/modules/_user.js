import { readDB } from "./_database";
import { allPosts, Post } from "./_post";

export function User(uid='', name='', profilePicUrl='', isLoggedIn=true, bio = "None", posts = {}) {
    //Getter
    const getUid = () => uid;
    const getName = () => name;
    const getProfilPicUrl = () => profilePicUrl;
    const getLoggedInStatus = () => isLoggedIn;
    const getBio = () => bio;
    const getPosts = () => posts;
  
    //Setter 
    const setBio = (userBio) => bio = userBio; 
    const setPost = (postID, postObject) => posts[postID] = postObject;
    const setLoggedInStatus = (status) => isLoggedIn = status;
    const setInitial = ([...userData]) => {
        uid = userData[0];
        name = userData[1];
        profilePicUrl = userData[2];
        setLoggedInStatus(true);
        setPosts()
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
    
    return { getUid, getName, getProfilPicUrl, getLoggedInStatus, getBio, getPosts, setBio, setPosts, setLoggedInStatus, setInitial, removeInitial };
}

export const user = User();