export function User(uid='', name='', profilePicUrl='', isLoggedIn=true, bio = "None", posts = []) {
    //Getter
    const getUid = () => uid;
    const getName = () => name;
    const getProfilPicUrl = () => profilePicUrl;
    const getLoggedInStatus = () => isLoggedIn;
    const getBio = () => bio;
    const getPosts = () => posts;
  
    //Setter 
    const setBio = (userBio) => bio = userBio; 
    const setPosts = (post) => posts.push(post);
    const setLoggedInStatus = (status) => isLoggedIn = status;
    const setInitial = ([...userData]) => {uid = userData[0]; name = userData[1]; profilePicUrl = userData[2]; setLoggedInStatus(true)};
    const removeInitial = () => {uid = ''; name = ''; profilePicUrl = ''; setLoggedInStatus(false)};
    
    return { getUid, getName, getProfilPicUrl, getLoggedInStatus, getBio, getPosts, setBio, setPosts, setLoggedInStatus, setInitial, removeInitial };
}

export const user = User();