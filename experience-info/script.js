const backBtn = document.getElementById("go-to-restart");
const startInputElement = document.querySelectorAll("input, textarea");
const resumePersonalInfo = document.getElementById("peronal-info-output");
const allResumeDiv = resumePersonalInfo.querySelectorAll("div, img");
const resumeExperienceInfo = document.getElementById("experience-info-output-container-0");
const allExperienceOutputDiv = resumeExperienceInfo.querySelectorAll("div");
const workTimeConection = document.getElementById("start-conection-end-work");
const positionComma = document.getElementById("position-comma");
const experienceText = document.getElementById("experience");
const lastLine = document.getElementById("line-from-description-position");
const addMoreExperience = document.getElementById("add-more-experience-btn");
const experienceForm = document.getElementById("experience-information-form");
const experienceFormChildren = document.getElementById("experience-information-form-children");
const experienceOutput = document.getElementById("experience-info-output");
let booleanObj = {};
let extraExperienceFormCounter = 0;
let inputsArr = [];

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
  duplicateForm(extraExperienceFormCounter);
  duplicateOutput(extraExperienceFormCounter);
  localStorage.setItem("extraExperienceFormCounter", extraExperienceFormCounter);
});

// if (i.name == "cv-position") {
//     if (i.value) {
//       positionComma.classList.remove("hidden");
//     } else {
//       positionComma.classList.add("hidden");
//     }
//   }

//   if (i.name == "cv-end-work") {
//     if (i.value) {
//       workTimeConection.classList.remove("hidden");
//     } else {
//       workTimeConection.classList.add("hidden");
//     }
//   }

//   //Experience text show and hide
//   booleanObj[i.name] = Boolean(i.value);
//   if (
//     booleanObj["cv-position"] ||
//     booleanObj["cv-start-work"] ||
//     booleanObj["cv-end-work"] ||
//     booleanObj["cv-description"] ||
//     booleanObj["cv-empleyer"]
//   ) {
//     experienceText.classList.remove("hidden");
//     lastLine.classList.remove("hidden");
//   } else {
//     experienceText.classList.add("hidden");
//     lastLine.classList.add("hidden");
//   }

function addBlurs(inputElements) {
  for (const element of inputElements) {
    element.value = localStorage.getItem(element.name);
    updateResume(element);
    element.addEventListener("blur", function () {
      localStorage.setItem(element.name, element.value);
      updateResume(element);
    });
  }
}

extraExperienceFormCounter = localStorage.getItem("extraExperienceFormCounter");
for (let i = 0; i < extraExperienceFormCounter; i++) {
  const newFormFields = duplicateForm(i + 1);
  duplicateOutput(i + 1);

  addBlurs(newFormFields);
}

addBlurs(startInputElement);

function duplicateForm(counter) {
  const originalFormSet = document.getElementById("experience-information-form-conteiner-0");
  const newFormSet = document.createElement("div");
  newFormSet.innerHTML = originalFormSet.innerHTML;

  newFormSet.id = `experience-information-form-conteiner-${counter}`;

  const newFormSetInputs = newFormSet.querySelectorAll("input, textarea");
  for (const newFormElement of newFormSetInputs) {
    newFormElement.name = `${newFormElement.name}-${counter}`;
    newFormElement.addEventListener("blur", function () {
      localStorage.setItem(newFormElement.name, newFormElement.value);
      updateResume(newFormElement);
    });
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
  experienceOutput.appendChild(newOutputSet);
}

function updateResume(element) {
  const value = localStorage.getItem(element.name);
  document.getElementById(element.name).textContent = value;
}
