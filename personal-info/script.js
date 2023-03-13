const backBtn = document.getElementById("go-to-restart");
const allInputs = document.querySelectorAll("input, textarea");
const emailLogo = document.getElementById("email-logo");
const phoneLogo = document.getElementById("phone-logo");
const lableAboutMe = document.getElementById("label-about-me");
const persEndLine = document.getElementById("pers-end-line");
const photo = document.getElementById("personal-photo");

function updateResume(i) {
  if (i.name == "cv-email" && i.value != "") {
    emailLogo.classList.remove("hidden");
  } else if (i.name == "cv-email" && i.value == "") {
    emailLogo.classList.add("hidden");
  }

  if (i.name == "cv-number" && i.value != "") {
    phoneLogo.classList.remove("hidden");
  } else if (i.name == "cv-number" && i.value == "") {
    phoneLogo.classList.add("hidden");
  }

  if (i.name == "cv-about-me" && i.value != "") {
    lableAboutMe.classList.remove("hidden");
    persEndLine.classList.remove("hidden");
  } else if (i.name == "cv-about-me" && i.value == "") {
    lableAboutMe.classList.add("hidden");
    persEndLine.classList.add("hidden");
  }
  if (i.name == "cv-photo") {
    const img = localStorage.getItem(i.name);
    if (img) {
      document.getElementById(i.name).src = localStorage.getItem(i.name);
    }
  } else {
    document.getElementById(i.name).textContent = localStorage.getItem(i.name);
  }
}

backBtn.addEventListener("click", function (e) {
  localStorage.clear();
});

for (const i of allInputs) {
  updateResume(i);
  if (i.name != "cv-photo") {
    i.value = localStorage.getItem(i.name);
    i.addEventListener("blur", function (e) {
      localStorage.setItem(i.name, i.value);
      updateResume(i);
    });
  }
}

let selectedImage = "";

photo.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsDataURL(photo.files[0]);
  fr.addEventListener("load", () => {
    const url = fr.result;
    selectedImage = url;
    localStorage.setItem("cv-photo", url);
    document.getElementById("cv-photo").src = url;
  });
});
