const backBtn = document.getElementById("go-to-restart");
const allInputs = document.querySelectorAll("input, textarea");

backBtn.addEventListener("click", function (e) {
  localStorage.clear();
});

for (const i of allInputs) {
  i.addEventListener("blur", function (e) {
    localStorage.setItem(i.name, i.value);
  });
  i.value = localStorage.getItem(i.name);
}
