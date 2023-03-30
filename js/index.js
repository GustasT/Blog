const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  document.body.style.overflowY =
    document.body.style.overflowY === "hidden" ? "visible" : "hidden";
});

const aboutButton = document.getElementById("aboutButton");

aboutButton.addEventListener("click", () => {
  window.location.href = "about.html";
});

const contactLink = document.getElementById("contactLink");

contactLink.addEventListener("click", () => {
  event.preventDefault();

  window.scrollTo({
    top: 10000000,
    behavior: "smooth",
  });
});

/////scrollas buginas ant mobile

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

////////////////////////////////

const APIendpoints = {
  GET: "https://testapi.io/api/Bubcikenzo/resource/blog",
  POST: "https://testapi.io/api/Bubcikenzo/resource/blog",
  PUT: (id) => "https://testapi.io/api/Bubcikenzo/resource/blog/" + id,
  DELETE: (id) => "https://testapi.io/api/Bubcikenzo/resource/blog/" + id,
};

const postList = document.querySelector(".recent-posts");

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
        
        </article>
`;
};
