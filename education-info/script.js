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
const startInputElement = document.querySelectorAll("input, textarea");


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


// Clear localStorage on back button
backBtn.addEventListener("click", function (e) {
    localStorage.clear();
});

//dropdown options
addDropDown(dropdown, list)
function addDropDown(dropDownItem, listItem) {
    dropDownItem.addEventListener("click", function (e) {
        listItem.classList.toggle("hidden");
    });
}


closeDropDown("form-degree", list)
function closeDropDown(formDegree, listItem) {
    document.addEventListener("click", (e) => {
        const degreeForm = document.getElementById(formDegree);
        if (!degreeForm.contains(e.target)) {
            listItem.classList.add("hidden");
        }
    });
}

setValueList(listItems, degree, list)
function setValueList(listElements, formDegree, listItem) {
    for (const item of listElements) {
        item.addEventListener("click", function (e) {
            formDegree.value = e.target.textContent;
            listItem.classList.toggle("hidden");
        });
    }
}


addMoreEducationBtn.addEventListener("click", function () {
    extraEducationFormCounter++
    duplicateForm(extraEducationFormCounter, true)
    duplicateOutput(extraEducationFormCounter)
    localStorage.setItem("extraEducationFormCounter", extraEducationFormCounter);
})



addBlurs(startInputElement)
// add extra forms on reloand if needed
extraEducationFormCounter = localStorage.getItem("extraEducationFormCounter");
for (let i = 0; i < extraEducationFormCounter; i++) {
    const newFormFields = duplicateForm(i + 1);
    duplicateOutput(i + 1);
    addBlurs(newFormFields);
}

function duplicateForm(counter, addBlurListener) {
    const originalFormSet = document.getElementById("education-information-form-conteiner-0")
    const newFormSet = document.createElement("div")
    newFormSet.innerHTML = originalFormSet.innerHTML

    const listDegree = newFormSet.getElementsByClassName("list-degree")
    listDegree[0].id = `list-${counter}`
    const extraListItems = newFormSet.getElementsByClassName("elements");

    newFormSet.id = `education-information-form-conteiner-${counter}`
    const newFormSetInputs = newFormSet.querySelectorAll("input, textarea");
    for (const newFormElement of newFormSetInputs) {
        newFormElement.value = ""
        newFormElement.name = `${newFormElement.name}-${counter}`

        if (newFormElement.name.startsWith("cv-degreee")) {
            newFormElement.parentNode.parentNode.id = `form-degree-${counter}`
            newFormElement.parentNode.id = `dropdown-input-${counter}`
            newFormElement.id = `degree-input-${counter}`
        }

        if (addBlurListener) {
            newFormElement.addEventListener("blur", function () {
                localStorage.setItem(newFormElement.name, newFormElement.value)
                updateResume(newFormElement);
            })
        }
    }

    educationFormChildren.appendChild(newFormSet)
    const extraList = document.getElementById(listDegree[0].id)
    const extraDropDown = document.getElementById(`dropdown-input-${counter}`)
    const degreeInput = document.getElementById(`degree-input-${counter}`)
    addDropDown(extraDropDown, extraList)
    closeDropDown(`form-degree-${counter}`, extraList)
    setValueList(extraListItems, degreeInput, extraList)
    return newFormSetInputs;
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


function updateResume(element) {
    const value = localStorage.getItem(element.name);
    document.getElementById(element.name).textContent = value;
}




