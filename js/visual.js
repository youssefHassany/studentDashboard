// showing pages in responsive
let navIcon = document.querySelector(".show-nav");

navIcon.onclick = () =>
  document.querySelector("nav").classList.toggle("show-n");

let toDoIcon = document.querySelector(".show-todo");

toDoIcon.onclick = () =>
  document.querySelector(".todo").classList.toggle("show-t");

// visualizations
const dots = document.querySelectorAll(".chart-data .dot");
const dataTxt = document.querySelectorAll(".chart-data p");
const navList = document.querySelectorAll("nav .sub-list li");
const col = document.querySelectorAll(".col");

function visualize(ind) {
  col[ind].classList.toggle("v-dot-col");
  dots[ind].classList.toggle("v-dot-col");
  dataTxt[ind].classList.toggle("v-p");
  navList[ind].classList.toggle("v-nav");
}

navList.forEach((element, index) => {
  element.onclick = () => {
    visualize(index);
  };
});
