async function logout() {
  const response = await fetch("api/users/logout", {
    method: "post",
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.replace("/login");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
