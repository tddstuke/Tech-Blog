async function editFormHandler(event) {
  event.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document
    .querySelector('input[name="post-content"]')
    .value.trim();
  console.log(post_content);
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, post_content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    console.log(title);
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}
document
  .querySelector("#edit-post")
  .addEventListener("submit", editFormHandler);
