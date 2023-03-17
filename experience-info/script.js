const backBtn = document.getElementById("go-to-restart");
const allInputs = document.querySelectorAll("input, textarea");
const resumePersonalInfo = document.getElementById("peronal-info-output")
const allResumeDiv = resumePersonalInfo.querySelectorAll("div");

// Update previus (Personal information) CV.
for (const i of allResumeDiv) {
    const localStorageGetItem = localStorage.getItem(i.id)
    if (localStorageGetItem) {
        i.textContent = localStorageGetItem
    }
}

// Clear localStorage on back button
backBtn.addEventListener("click", function (e) {
    localStorage.clear();
});


for (const i of allInputs) {
    updateResume(i)
    i.value = localStorage.getItem(i.name)
    i.addEventListener("blur", function (e) {
        localStorage.setItem(i.name, i.value);
        updateResume(i)
    });
}

function updateResume(i) {
    const element = document.getElementById(i.name);
    element.textContent = localStorage.getItem(i.name)
}