const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector(".nav-links");

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
