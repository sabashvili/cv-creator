const backBtn = document.getElementById("go-to-restart");
const allInputs = document.querySelectorAll("input, textarea");
const resumePersonalInfo = document.getElementById("peronal-info-output");
const allResumeDiv = resumePersonalInfo.querySelectorAll("div, img");
const workTimeConection = document.getElementById("start-conection-end-work");
const positionComma = document.getElementById("position-comma");
const experienceText = document.getElementById("experience");
const lastLine = document.getElementById("line-from-description-position");
const addMoreExperience = document.getElementById("add-more-experience-btn");
const experienceForm = document.getElementById("experience-information-form");
const experienceOutput = document.getElementById("experience-info-output");
let booleanObj = {};
let formNumberCounter = 0;

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
  duplicateForm();
  duplicateOutput();
});

for (const i of allInputs) {
  i.value = localStorage.getItem(i.name);
  updateResume(i);
  i.addEventListener("blur", function (e) {
    localStorage.setItem(i.name, i.value);
    updateResume(i);
  });
}

function updateResume(i) {
  const element = document.getElementById(i.name);
  if (i.name == "cv-position") {
    if (i.value) {
      positionComma.classList.remove("hidden");
    } else {
      positionComma.classList.add("hidden");
    }
  }

  if (i.name == "cv-end-work") {
    if (i.value) {
      workTimeConection.classList.remove("hidden");
    } else {
      workTimeConection.classList.add("hidden");
    }
  }

  //Experience text show and hide
  booleanObj[i.name] = Boolean(i.value);
  if (
    booleanObj["cv-position"] ||
    booleanObj["cv-start-work"] ||
    booleanObj["cv-end-work"] ||
    booleanObj["cv-description"] ||
    booleanObj["cv-empleyer"]
  ) {
    experienceText.classList.remove("hidden");
    lastLine.classList.remove("hidden");
  } else {
    experienceText.classList.add("hidden");
    lastLine.classList.add("hidden");
  }

  element.textContent = localStorage.getItem(i.name);
}

function duplicateForm() {
  const originalFormSet = document.getElementById(
    "experience-information-form-conteiner"
  );
  const newFormSet = document.createElement("div");
  newFormSet.innerHTML = originalFormSet.innerHTML;
  formNumberCounter++;
  newFormSet.id = `experience-information-form-conteiner-${formNumberCounter}`;
  experienceForm.insertBefore(newFormSet, addMoreExperience);
}

function duplicateOutput() {
  const originalOutoutSet = document.getElementById(
    "experience-info-output-container"
  );
  const newOutputSet = document.createElement("div");
  newOutputSet.innerHTML = originalOutoutSet.innerHTML;
  newOutputSet.id = `experience-info-output-container-${formNumberCounter}`;
  const allInputsInNewOutputSet = newOutputSet.querySelectorAll("div");
  experienceOutput.appendChild(newOutputSet);
  for (const i of allInputsInNewOutputSet) {
    for (const x of i.childNodes) {
      x.textContent = "";
    }
  }
}
