backBtn = document.getElementById("go-to-restart");
backBtn.addEventListener("click", function (e) {
  localStorage.clear();
});

const allInputs = document.querySelectorAll("input, textarea");
for (const i of allInputs) {
  i.addEventListener("blur", function (e) {
    localStorage.setItem(i.name, i.value);
  });
  document.getElementById(i.name).value = localStorage.getItem(i.name);
}
