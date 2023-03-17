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


