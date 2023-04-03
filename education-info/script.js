const dropdown = document.getElementById("dropdown-input");
const list = document.getElementById("list");
const listItems = document.getElementsByClassName("elements");
let degree = document.getElementById("degree-input");
const backBtn = document.getElementById("go-to-restart");
const resumeInfo = document.getElementById("resume-side");
let allResumeDiv = resumeInfo.querySelectorAll("div, img");
const addMoreEducationBtn = document.getElementById("add-more-education-btn");
const experienceOutput = document.getElementById("experience-info-output");
const extraExperienceFormCounter = localStorage.getItem("extraExperienceFormCounter");
const educationFormChildren = document.getElementById("education-information-form-children");
let extraEducationFormCounter = 0
const educationOutputChildren = document.getElementById("education-info-output")

// add previus Experience forms
for (let i = 0; i < extraExperienceFormCounter; i++) {
    duplicateExperienceForm(i + 1)
    allResumeDiv = resumeInfo.querySelectorAll("div, img");
}

// Update previus (Personal and experience information) CV.
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

    newOutputSet.getElementsByClassName("comma")[0].classList.remove("hidden");
    newOutputSet.getElementsByClassName("hyphen")[0].classList.remove("hidden");
    experienceOutput.appendChild(newOutputSet);
}


// Clear localStorage on back button
backBtn.addEventListener("click", function (e) {
    localStorage.clear();
});

//dropdown options
dropdown.addEventListener("click", function (e) {
    list.classList.toggle("hidden");
});

for (const item of listItems) {
    item.addEventListener("click", function (e) {
        degree.value = e.target.textContent;
        list.classList.toggle("hidden");
    });
}

document.addEventListener("click", (e) => {
    const degreeForm = document.getElementById("form-degree");
    if (!degreeForm.contains(e.target)) {
        list.classList.add("hidden");
    }
});

addMoreEducationBtn.addEventListener("click", function () {
    extraEducationFormCounter++
    duplicateForm(extraEducationFormCounter)
    duplicateOutput(extraEducationFormCounter)
})



function duplicateForm(counter) {
    const originalFormSet = document.getElementById("education-information-form-conteiner-0")
    const newFormSet = document.createElement("div")
    newFormSet.innerHTML = originalFormSet.innerHTML

    newFormSet.id = `education-information-form-conteiner-${counter}`
    const newFormSetInputs = newFormSet.querySelectorAll("input, textarea");
    for (const newFormElement of newFormSetInputs) {
        newFormElement.name = `${newFormElement.name}-${counter}`


        newFormElement.addEventListener("blur", function () {
            localStorage.setItem(newFormElement.name, newFormElement.value)
        })
    }
    educationFormChildren.appendChild(newFormSet)
}

function duplicateOutput(counter) {
    const originalOutputSet = document.getElementById("education-info-output-container-0")
    const newOutputSet = document.createElement("div")
    newOutputSet.innerHTML = originalOutputSet.innerHTML
    newOutputSet.id = `education-info-output-container-${counter}`
    const newOutputSetResume = newOutputSet.getElementsByClassName("cv-field");
    for (const newOutputElement of newOutputSetResume) {
        newOutputElement.id = `${newOutputElement.id}-${counter}`
        newOutputElement.textContent = "";
    }

    educationOutputChildren.appendChild(newOutputSet)

}








