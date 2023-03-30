const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const formSubmitButton = document.getElementById("formSubmitButton");
const signOutButton = document.getElementById("signOutButton");
const form = document.getElementById("form");
const formSticker = document.getElementById("formSticker");

const APIendpoints = {
  GET: "https://testapi.io/api/Bubcikenzo/resource/users",
  POST: "https://testapi.io/api/Bubcikenzo/resource/users",
  PUT: (id) => "https://testapi.io/api/Bubcikenzo/resource/users/" + id,
  DELETE: (id) => "https://testapi.io/api/Bubcikenzo/resource/users/" + id,
};

signUpButton.addEventListener("click", () => {
  event.preventDefault();

  signUpButton.style.backgroundColor = "lightgreen";
  signInButton.style.backgroundColor = "transparent";

  formSticker.textContent = "SIGN UP";

  document.getElementById("passwordCheck").classList.remove("invisible");
  document.getElementById("passwordCheckLabel").classList.remove("invisible");
});

signInButton.addEventListener("click", () => {
  event.preventDefault();

  signUpButton.style.backgroundColor = "transparent";
  signInButton.style.backgroundColor = "lightgreen";

  formSticker.textContent = "SIGN IN";

  document.getElementById("passwordCheck").classList.add("invisible");
  document.getElementById("passwordCheckLabel").classList.add("invisible");
});

const contactLink = document.getElementById("contactLink");

contactLink.addEventListener("click", () => {
  event.preventDefault();

  window.scrollTo({
    top: 10000000,
    behavior: "smooth",
  });
});

formSubmitButton.addEventListener("click", () => {
  event.preventDefault();

  if (
    formSticker.textContent == "SIGN UP" &&
    document.getElementById("password").value ==
      document.getElementById("passwordCheck").value
  ) {
    const payload = new FormData(form);

    fetch(APIendpoints.POST, {
      method: "POST",
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    console.log("Registered Sucessfully!!");
  } else {
    console.log("Passwords do not match");
  }

  if (formSticker.textContent == "SIGN IN") {
    fetch(APIendpoints.GET)
      .then((res) => {
        if (res.ok) {
          console.log("GET request sucessful");
        } else {
          console.log("GET request unsucessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => userSignIn(data))
      .catch((err) => console.log(err));
  }
});

function userSignIn(data) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // console.log(data);

  for (i = 0; i < data.data.length; i++) {
    if (email == data.data[i].email && password == data.data[i].password) {
      console.log(email + " is sucessfully logged in !!");

      sessionStorage.setItem("UserID", data.data[i].id);

      location.reload();

      return;
    }
  }
  console.log("incorrect email or password");
}

// function isLoggedIn() {
//   if (sessionStorage.getItem("UserID") !== null) {
//     console.log("a user is logged in");
//   } else {
//     console.log("no user is logged in");
//   }
// }

if (sessionStorage.getItem("UserID") !== null) {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("signOutContainer").style.display = "block";
} else {
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("signOutContainer").style.display = "none";
}

signOutButton.addEventListener("click", () => {
  event.preventDefault();

  sessionStorage.removeItem("UserID");
  location.reload();
});

// function userSignUp(data) {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   // console.log(data);

//   for (i = 0; i < data.data.length; i++) {
//     if (email == data.data[i].email) {
//       console.log(email + " is already taken !!");

//       return;
//     }
//   }
//   console.log("incorrect email or password");
// }
