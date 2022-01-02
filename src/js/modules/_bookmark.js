
import { user } from "./_user";
import bookmark from '../../assets/bookmark.svg'
import bookmarked from '../../assets/bookmarked.svg'
import { off, onValue, ref } from "firebase/database";
import { database } from "./_database";
import { allPosts } from "./_post";

export const bookmarkFunction = (e) => {
    const postId = e.target.dataset.id;
    const isBookmarked = user.addPostToBookmark(postId);
    e.target.src = isBookmarked ? bookmarked : bookmark;
}

function handleBookmarksData(data){
    user.setBookmarks(data.val());
    allPosts.loadBookmarkedPost();
}

export function initializeBookmarkListener(){
    const bookmarkRef = ref(database, `user-bookmarks/${user.getUid()}`);
    onValue(bookmarkRef, handleBookmarksData);
}

export function detachBookmarkListener(){
    const bookmarkRef = ref(database, `user-bookmarks/${user.getUid()}`);
    off(bookmarkRef);
}
