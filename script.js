// COOKIES
var cookiesBar = document.getElementById("cookiesBar");
var cookiesAccept = document.getElementById("cookiesAccept");

if (localStorage.getItem("cookiesAccepted")) {
  cookiesBar.style.display = "none";
}

cookiesAccept.addEventListener("click", function() {
  localStorage.setItem("cookiesAccepted", "true");
  cookiesBar.style.display = "none";
});


// HEADER SCROLL
var header = document.getElementById("header");

window.addEventListener("scroll", function() {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// BURGER MENU
var burger = document.getElementById("burger");
var navLinks = document.getElementById("navLinks");

burger.addEventListener("click", function() {
  burger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", function() {
    burger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});


// SCROLL TO TOP
var scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", function() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// FETCH PLAYERS FROM API
var playersGrid = document.getElementById("playersGrid");

fetch("https://randomuser.me/api/?results=8&inc=name,picture,location,login")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    playersGrid.innerHTML = "";
    var users = data.results;
    users.forEach(function(user, index) {
      var card = document.createElement("div");
      card.className = "player-card";

      var img = document.createElement("img");
      img.className = "player-avatar";
      img.src = user.picture.medium;
      img.alt = user.name.first;

      var name = document.createElement("div");
      name.className = "player-name";
      name.textContent = user.name.first + " " + user.name.last;

      var tag = document.createElement("div");
      tag.className = "player-tag";
      tag.textContent = "@" + user.login.username.slice(0, 10);

      var country = document.createElement("div");
      country.className = "player-country";
      country.textContent = user.location.country;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(tag);
      card.appendChild(country);
      playersGrid.appendChild(card);
    });
  })
  .catch(function() {
    playersGrid.innerHTML = "<div class='loader'>Failed to load players</div>";
  });


// FORM VALIDATION
var regForm = document.getElementById("regForm");

var fname = document.getElementById("fname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPass = document.getElementById("confirmPass");

var fnameError = document.getElementById("fnameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var confirmError = document.getElementById("confirmError");
var successMsg = document.getElementById("successMsg");

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

regForm.addEventListener("submit", function(e) {
  e.preventDefault();
  var valid = true;

  fnameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";
  successMsg.textContent = "";

  if (fname.value.trim() === "") {
    fnameError.textContent = "სახელის შეყვანა სავალდებულოა";
    valid = false;
  }

  if (email.value.trim() === "") {
    emailError.textContent = "Email-ის შეყვანა სავალდებულოა";
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Email-ის ფორმატი არასწორია";
    valid = false;
  }

  if (password.value === "") {
    passwordError.textContent = "პაროლის შეყვანა სავალდებულოა";
    valid = false;
  } else if (!passwordRegex.test(password.value)) {
    passwordError.textContent = "მინ. 8 სიმბოლო, ასო და რიცხვი";
    valid = false;
  }

  if (confirmPass.value === "") {
    confirmError.textContent = "გაიმეორე პაროლი";
    valid = false;
  } else if (confirmPass.value !== password.value) {
    confirmError.textContent = "პაროლები არ ემთხვევა";
    valid = false;
  }

  if (valid) {
    successMsg.textContent = "✓ რეგისტრაცია წარმატებულია!";
    regForm.reset();
  }
});


// SHOW / HIDE PASSWORD
var togglePass = document.getElementById("togglePass");
var toggleConfirm = document.getElementById("toggleConfirm");

togglePass.addEventListener("click", function() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

toggleConfirm.addEventListener("click", function() {
  if (confirmPass.type === "password") {
    confirmPass.type = "text";
  } else {
    confirmPass.type = "password";
  }
});
