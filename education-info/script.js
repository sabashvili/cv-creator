const dropdown = document.getElementById("dropdown-input");
const list = document.getElementById("list");
const listItems = document.getElementsByClassName("elements");
let degree = document.getElementById("degree-input");

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

// document.addEventListener("click", (e) => {
//     const degreeForm = document.getElementById("degree-form");
//     if (!degreeForm.contains(e.target)) {
//         list.classList.add("hidden");
//     }
// });