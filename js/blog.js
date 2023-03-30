const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector(".nav-links");
const form = document.getElementById("newArticleForm");
const addArticleButton = document.getElementById("addArticleButton");
const postList = document.querySelector(".recent-posts");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  document.body.style.overflowY =
    document.body.style.overflowY === "hidden" ? "visible" : "hidden";
});

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".navbar").style.top = "0";
  } else {
    document.querySelector(".navbar").style.top = "-100%";
  }
  prevScrollpos = currentScrollPos;
};

const contactLink = document.getElementById("contactLink");

contactLink.addEventListener("click", () => {
  event.preventDefault();

  window.scrollTo({
    top: 10000000,
    behavior: "smooth",
  });
});
/////////////////////////////////////////////////////////////////////////////////
const APIendpoints = {
  GET: "https://testapi.io/api/Bubcikenzo/resource/blog",
  POST: "https://testapi.io/api/Bubcikenzo/resource/blog",
  PUT: (id) => "https://testapi.io/api/Bubcikenzo/resource/blog/" + id,
  DELETE: (id) => "https://testapi.io/api/Bubcikenzo/resource/blog/" + id,
};

if (sessionStorage.getItem("UserID") !== null) {
  document.querySelector(".create-article").style.display = "block";
} else {
  document.querySelector(".create-article").style.display = "none";
}

addArticleButton.addEventListener("click", () => {
  event.preventDefault();

  const payload = new FormData(form);

  const userId = sessionStorage.getItem("UserID");

  payload.append("identification", userId);

  fetch(APIendpoints.POST, {
    method: "POST",
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  location.reload();
});

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

window.onload = async () => {
  const posts = await getData(APIendpoints.GET);
  posts.data.forEach((post) => {
    postList.innerHTML += postTemplate(post);
  });
};

const postTemplate = (postData) => {
  let isOwner = "invisible";
  if (postData.identification == sessionStorage.getItem("UserID")) {
    isOwner = "";
  }
  return `
  <article class="main-page-article user-${postData.identification}" id = "${postData.id}">
          <div class="article-picture">
            <img
              src="${postData.image}"
              alt="."
            />
          </div>
          <div class="article-text-container">
            <div class="article-info">
              <span class="article-date">${postData.createdAt}</span>
              <span class="article-reading-time">2 min</span>
            </div>
            <h3 class="article-title">${postData.title}</h3>
            <p class="article-text">
              ${postData.content}
            </p>

            <span class="comments"
              ><hr />
              0 comments</span
            >
          </div>
          <button class="button ${isOwner} deleteButton" onClick="deletePost(${postData.id})">Delete</button>
        </article>
`;
};

const deletePost = (id) => {
  const url = APIendpoints.DELETE(id);

  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    response.status === 204 && document.getElementById(id).remove();
  });
};

// if (
//   sessionStorage.getItem("UserID") ==
//   document.querySelector(".user-" + sessionStorage.getItem("UserID"))
// ) {
//   document.body.style.backgroundColor = "black";
// }
