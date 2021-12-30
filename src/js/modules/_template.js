import bookmark from '../../assets/bookmark.svg'
import bookmarked from '../../assets/bookmarked.svg'

export const formTagTemplate = (tagValue) => {
    const parent = document.createElement("p");
    parent.classList.add("new-post-tag");
    parent.innerHTML = `${tagValue}<span class="tag-delete" data-value='${tagValue}'>&#x2715;</span>`;
    return parent;
}

export const postTemplate = (id, title, description, link, tags=[], timestamp, author) => {
    const parent = document.createElement("div");
    parent.classList.add("post");
    parent.dataset.id = id;
    const date = new Date(timestamp);
    const dateString = `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`
    parent.innerHTML = `<h2 class="post-title">${title}</h2>
                        <p class="post-description">
                            ${description}
                        </p>
                        <a
                            href=${link}
                            target="_blank"
                            class="link-reset post-link">${link}</a>
                        <div class="post-tags">
                            ${tags.reduce((prev, curr) => prev + `<p class='post-tag'>${curr}</p>`, "")}
                        </div>
                        <div class="post-footer">
                            <p class="post-timestamp">${dateString}</p>
                            <img class="post-bookmark" src=${bookmark} alt="bookmark">
                            <p class="post-author">${author}</p>
                        </div>`
    return parent;
}