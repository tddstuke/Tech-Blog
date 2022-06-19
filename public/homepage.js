function getPostId(event) {
  event.preventDefault();
  console.log(event.target.id);
}

document.querySelector("#post-list").addEventListener("click", getPostId);
