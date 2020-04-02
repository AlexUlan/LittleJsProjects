const postContainer = document.querySelector("#post-container");
const loader = document.querySelector("#loader");
const filterInput = document.querySelector("#filter");

let limitPost = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limitPost}`,
  );
  const data = await res.json();
  return data;
}

async function initPosts() {
  const posts = await getPosts();
  posts.forEach(post => {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">
      ${post.title}
    </h2>
    <p class="post-body">
      ${post.body}
    </p>
  </div>    `;
    postContainer.appendChild(newPost);
  });
}
initPosts();

function showLoding() {
  loader.classList.add("show");
  page++;
  initPosts();
  setTimeout(() => {
    setTimeout(() => {
      loader.classList.remove("show");
    }, 300);
  }, 1000);
}

window.addEventListener("scroll", () => {
  let { clientHeight, scrollTop, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoding();
  }
});

function filterWord(e) {
  const allPosts = document.querySelectorAll(".post");
  let searchValue = e.target.value.trim().toUpperCase();

  allPosts.forEach(post => {
    const postTitle = post.querySelector(".post-title").innerText.toUpperCase();
    const postText = post.querySelector(".post-body").innerText.toUpperCase();
    if (
      (postTitle.indexOf(searchValue) === -1) &
      (postText.indexOf(searchValue) === -1)
    ) {
      post.style.display = "none";
    } else {
      post.style.display = "flex";
    }
  });
}

filterInput.addEventListener("input", filterWord);
