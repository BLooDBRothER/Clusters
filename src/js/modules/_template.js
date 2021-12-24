export const formTagTemplate = (tagValue) => {
    const parent = document.createElement("p");
    parent.classList.add("new-post-tag");
    parent.innerHTML = `${tagValue}<span class="tag-delete" data-value='${tagValue}'>&#x2715;</span>`;
    return parent;
}