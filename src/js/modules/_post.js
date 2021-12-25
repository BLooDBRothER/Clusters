export function Post(id, title, description, link, tags, author, timestamp=new Date()){
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

    // setter
    const setID = (idValue) => id = idValue;
    const setTitle = (titleValue) => title = titleValue;
    const setDescription = (descriptionValue) => description = descriptionValue;
    const setLink = (linkValue) => link = linkValue;
    const setTags = (tagsValue) => tags = tagsValue;
    const setTimestamp = (timestampValue) => timestamp = timestampValue;
    const setAuthor = (authorValue) => authorValue = author;

    return {getID, getTitle, getDescription, getLink, getTags, getTimestamp, getAuthor, getAsObject, setID, setAuthor, setTags, setTitle, setDescription, setLink, setTimestamp};
}