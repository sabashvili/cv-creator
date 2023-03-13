const backBtn = document.getElementById("go-to-restart");
const allInputs = document.querySelectorAll("input, textarea");
const emailLogo = document.getElementById("email-logo")
const phoneLogo = document.getElementById("phone-logo")
const lableAboutMe = document.getElementById("label-about-me")

function updateResume(i) {
  if (i.name == "cv-email" && i.value != "") {
    emailLogo.classList.remove("hidden")
  } else if (i.name == "cv-email" && i.value == "") {
    emailLogo.classList.add("hidden")
  }

  if (i.name == "cv-number" && i.value != "") {
    phoneLogo.classList.remove("hidden")
  } else if (i.name == "cv-number" && i.value == "") {
    phoneLogo.classList.add("hidden")
  }

  if (i.name == "cv-about-me" && i.value != "") {
    lableAboutMe.classList.remove("hidden")
  } else if (i.name == "cv-about-me" && i.value == "") {
    lableAboutMe.classList.add("hidden")
  }
  document.getElementById(i.name).textContent = localStorage.getItem(i.name);
}


backBtn.addEventListener("click", function (e) {
  localStorage.clear();
});

for (const i of allInputs) {
  i.value = localStorage.getItem(i.name);
  updateResume(i);
  i.addEventListener("blur", function (e) {
    localStorage.setItem(i.name, i.value);
    updateResume(i);
  });

}


