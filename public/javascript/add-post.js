async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector(
    'input[name="post-content"]'
  ).value;
  // const user_id = req.session.id;
  console.log(title, post_content);
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
      // user_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#new-post").addEventListener("submit", newFormHandler);
