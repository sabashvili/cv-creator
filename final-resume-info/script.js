const backBtn = document.getElementById("go-to-restart");
const extraExperienceFormCounter = localStorage.getItem("extraExperienceFormCounter");
const extraEducationFormCounter = localStorage.getItem("extraEducationFormCounter");
const resumeInfo = document.getElementById("final-resume");
let allResumeDiv = resumeInfo.querySelectorAll("div, img");
const experienceOutput = document.getElementById("experience-info-output");
const educationOutputChildren = document.getElementById("education-info-output");


// Clear localStorage on back button
backBtn.addEventListener("click", function (e) {
    localStorage.clear();
});

for (let i = 0; i < extraExperienceFormCounter; i++) {
    duplicateExperienceForm(i + 1);
    allResumeDiv = resumeInfo.querySelectorAll("div, img");
}

for (let i = 0; i < extraEducationFormCounter; i++) {
    duplicateEducationForm(i + 1);
    allResumeDiv = resumeInfo.querySelectorAll("div, img");
}


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


function duplicateExperienceForm(counter) {
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


function duplicateEducationForm(counter) {
    const originalOutputSet = document.getElementById("education-info-output-container-0");
    const newOutputSet = document.createElement("div");
    newOutputSet.innerHTML = originalOutputSet.innerHTML;
    newOutputSet.id = `education-info-output-container-${counter}`;
    const newOutputSetResume = newOutputSet.getElementsByClassName("cv-field");
    for (const newOutputElement of newOutputSetResume) {
        newOutputElement.id = `${newOutputElement.id}-${counter}`;
        newOutputElement.textContent = "";
    }
    educationOutputChildren.appendChild(newOutputSet);
}