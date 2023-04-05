const backBtn = document.getElementById("go-to-restart");
const startInputElement = document.querySelectorAll("input, textarea");
const resumePersonalInfo = document.getElementById("peronal-info-output");
const allResumeDiv = resumePersonalInfo.querySelectorAll("div, img");
const addMoreExperience = document.getElementById("add-more-experience-btn");
const experienceForm = document.getElementById("experience-information-form");
const experienceFormChildren = document.getElementById("experience-information-form-children");
const experienceOutput = document.getElementById("experience-info-output");
let extraExperienceFormCounter = 0;


// Clear localStorage on back button
backBtn.addEventListener("click", function (e) {
  localStorage.clear();
});

// Update previus (Personal information) CV.
for (const i of allResumeDiv) {
  const localStorageGetItem = localStorage.getItem(i.id);
  if (localStorageGetItem) {
    if (i.id != "cv-photo") {
      i.textContent = localStorageGetItem;
    } else {
      document.getElementById(i.id).src = localStorageGetItem;
    }
  }
}

addMoreExperience.addEventListener("click", function (e) {
  extraExperienceFormCounter++;
  duplicateForm(extraExperienceFormCounter, true);
  duplicateOutput(extraExperienceFormCounter);
  localStorage.setItem("extraExperienceFormCounter", extraExperienceFormCounter);
});

// add blur listener to initial form inputs
addBlurs(startInputElement);

// add extra forms on reloand if needed
extraExperienceFormCounter = localStorage.getItem("extraExperienceFormCounter");
for (let i = 0; i < extraExperienceFormCounter; i++) {
  const newFormFields = duplicateForm(i + 1);
  duplicateOutput(i + 1);
  addBlurs(newFormFields);
}


experienceForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const allValidationResultArray = [];
  const finalInputElements = document.querySelectorAll("input, textarea");
  for (const element of finalInputElements) {
    const validateResult = validate(element.name, element.value);
    checkValidation(element, validateResult);
    allValidationResultArray.push(validateResult)
  }
  const finalResultValidation = allArrayElementAreEqual(
    allValidationResultArray
  );
  if (finalResultValidation) {
    window.location.href = "../education-info/";
  }
})


// add blur listener
function addBlurs(inputElements) {
  for (const element of inputElements) {
    element.value = localStorage.getItem(element.name);
    updateResume(element);
    element.addEventListener("blur", function () {
      localStorage.setItem(element.name, element.value);
      updateResume(element);
      const validateResult = validate(element.name, element.value);
      checkValidation(element, validateResult);
    });
  }
}

function duplicateForm(counter, addBlurListener) {
  const originalFormSet = document.getElementById("experience-information-form-conteiner-0");
  const newFormSet = document.createElement("div");
  newFormSet.innerHTML = originalFormSet.innerHTML;

  newFormSet.id = `experience-information-form-conteiner-${counter}`;

  const newFormSetInputs = newFormSet.querySelectorAll("input, textarea");
  for (const newFormElement of newFormSetInputs) {
    newFormElement.name = `${newFormElement.name}-${counter}`;

    newFormElement.parentElement
      .getElementsByClassName("validation-icon-success")[0].classList.add("hidden")
    newFormElement.parentElement
      .getElementsByClassName("validation-icon-error")[0].classList.add("hidden")
    newFormElement.classList.remove("validation-success-color");
    newFormElement.classList.remove("validation-error-color");


    if (addBlurListener) {
      newFormElement.addEventListener("blur", function () {
        localStorage.setItem(newFormElement.name, newFormElement.value);
        updateResume(newFormElement);
        const validateResult = validate(newFormElement.name, newFormElement.value);
        checkValidation(newFormElement, validateResult);
      });
    }
  }
  experienceFormChildren.appendChild(newFormSet);

  return newFormSetInputs;
}

function duplicateOutput(counter) {
  const originalOutoutSet = document.getElementById("experience-info-output-container-0");
  const newOutputSet = document.createElement("div");
  newOutputSet.innerHTML = originalOutoutSet.innerHTML;
  newOutputSet.id = `experience-info-output-container-${counter}`;
  const newOutputSetResume = newOutputSet.getElementsByClassName("cv-field");
  for (const newOutputElement of newOutputSetResume) {
    newOutputElement.id = `${newOutputElement.id}-${counter}`;
    newOutputElement.textContent = "";
  }

  newOutputSet.getElementsByClassName("comma")[0].classList.add("hidden");
  newOutputSet.getElementsByClassName("hyphen")[0].classList.add("hidden");
  experienceOutput.appendChild(newOutputSet);
}

function updateResume(element) {
  const value = localStorage.getItem(element.name);

  const outPutParentElement = document.getElementById(element.name).parentNode;
  if (element.name.startsWith("cv-position")) {
    if (element.value) {
      outPutParentElement.getElementsByClassName("comma")[0].classList.remove("hidden");
    } else {
      outPutParentElement.getElementsByClassName("comma")[0].classList.add("hidden");
    }
  }

  if (element.name.startsWith("cv-end-work")) {
    if (element.value) {
      outPutParentElement.getElementsByClassName("hyphen")[0].classList.remove("hidden");
    } else {
      outPutParentElement.getElementsByClassName("hyphen")[0].classList.add("hidden");
    }
  }
  document.getElementById(element.name).textContent = value;
}


function validate(name, value) {
  if (name.startsWith("cv-position") || name.startsWith("cv-empleyer")) {
    return validateMoreThanTwo(value);
  }
  if (name.startsWith("cv-start-work") || name.startsWith("cv-end-work")) {
    if (value) {
      return true
    }
  }
  if (name.startsWith("cv-description")) {
    return true
  }
}

function validateMoreThanTwo(value) {
  if (value.length < 2) {
    return false;
  } else {
    return true;
  }
}

function checkValidation(i, validateResult) {
  if (validateResult) {
    i.classList.add("validation-success-color");
    i.classList.remove("validation-error-color");
    i.parentElement
      .getElementsByClassName("validation-icon-success")[0]
      .classList.remove("hidden");
    i.parentElement
      .getElementsByClassName("validation-icon-error")[0]
      .classList.add("hidden");
  } else {
    i.classList.remove("validation-success-color");
    i.classList.add("validation-error-color");
    i.parentElement
      .getElementsByClassName("validation-icon-error")[0]
      .classList.remove("hidden");
    i.parentElement
      .getElementsByClassName("validation-icon-success")[0]
      .classList.add("hidden");
  }
}


function allArrayElementAreEqual(array) {
  const result = array.every((element) => {
    return element;
  });
  return result;
}



