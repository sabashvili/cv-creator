const backBtn = document.getElementById("go-to-restart");
const allInputs = document.querySelectorAll("input, textarea");
const emailLogo = document.getElementById("email-logo");
const phoneLogo = document.getElementById("phone-logo");
const lableAboutMe = document.getElementById("label-about-me");
const persEndLine = document.getElementById("pers-end-line");
const photo = document.getElementById("personal-photo");
const phoneNumber = document.getElementById("phoneNumber");
const personalInformationForm = document.getElementById(
  "personal-information-form"
);

// main function
for (const i of allInputs) {
  updateResume(i);
  if (i.name != "cv-photo") {
    i.value = localStorage.getItem(i.name);
    i.addEventListener("blur", function (e) {
      localStorage.setItem(i.name, i.value);
      updateResume(i);
      const validateResult = validate(i.name, i.value);
      checkValidation(i, validateResult);
    });
  }
}

// Clear localStorage on back button
backBtn.addEventListener("click", function (e) {
  localStorage.clear();
});

personalInformationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const allValidationResultArray = [];
  for (const i of allInputs) {
    if (i.name != "cv-photo") {
      const validateResult = validate(i.name, i.value);
      checkValidation(i, validateResult);
      allValidationResultArray.push(validateResult);
    }
  }
  const finalResultValidation = allArrayElementAreEqual(
    allValidationResultArray
  );
  if (finalResultValidation) {
    window.location.href = "../experience-info/";
  }
});

// function about set validation
function checkValidation(i, validateResult) {
  if (validateResult) {
    i.classList.add("validation-success-color");
    i.classList.remove("validation-error-color");
    if (i.name != "cv-about-me") {
      i.parentElement
        .getElementsByClassName("validation-icon-success")[0]
        .classList.remove("hidden");
      i.parentElement
        .getElementsByClassName("validation-icon-error")[0]
        .classList.add("hidden");
    }
  } else {
    i.classList.remove("validation-success-color");
    i.classList.add("validation-error-color");
    if (i.name != "cv-photo") {
      i.parentElement
        .getElementsByClassName("validation-icon-error")[0]
        .classList.remove("hidden");
      i.parentElement
        .getElementsByClassName("validation-icon-success")[0]
        .classList.add("hidden");
    }
  }
}

// photo convertor and save in localStorage
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

//Update resume from inputs
function updateResume(i) {
  const value = localStorage.getItem(i.name);

  if (i.name == "cv-email") {
    if (value) {
      emailLogo.classList.remove("hidden");
    } else {
      emailLogo.classList.add("hidden");
    }
  }

  if (i.name == "cv-number") {
    if (value) {
      phoneLogo.classList.remove("hidden");
    } else {
      phoneLogo.classList.add("hidden");
    }
  }

  if (i.name == "cv-about-me") {
    if (value) {
      lableAboutMe.classList.remove("hidden");
      persEndLine.classList.remove("hidden");
    } else {
      lableAboutMe.classList.add("hidden");
      persEndLine.classList.add("hidden");
    }
  }

  if (i.name == "cv-photo") {
    if (value) {
      document.getElementById(i.name).src = value;
    }
  } else {
    document.getElementById(i.name).textContent = value;
  }
}

// Validation
function validate(name, value) {
  if (name == "cv-first-name" || name == "cv-last-name") {
    return validateMoreThanTwo(value);
  } else if (name == "cv-email") {
    return validateEmail(value);
  } else if (name == "cv-about-me") {
    return true;
  } else if (name == "cv-number") {
    if (value != "" && value.length == 14) {
      return true;
    } else return false;
  }
}

// Validation first and last name, where more than two
function validateMoreThanTwo(value) {
  if (value.length < 2) {
    return false;
  } else {
    return true;
  }
}

// Validation Email
function validateEmail(value) {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.ge*$/;

  if (value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

// phoneNumber format
phoneNumber.addEventListener("keydown", function () {
  if (phoneNumber.value.length < 2) {
    const numberReplace = phoneNumber.value.replace("", "+995 ");
    phoneNumber.value = numberReplace;
  }
});

function allArrayElementAreEqual(array) {
  const result = array.every((element) => {
    return element;
  });
  return result;
}
