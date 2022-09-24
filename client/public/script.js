let btn = document.getElementById("btn");
let btnC = document.getElementById("btn-close");
let sidebar = document.querySelector(".sidebar");
var coll = document.getElementsByClassName("collapsible");
var i;
btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
btnC.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active-collapsible");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
