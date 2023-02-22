// Dark Mode
let mainColors = document.querySelectorAll(".main-col span");
let theRoot = document.querySelector(":root");

for (let i = 0; i < mainColors.length; i++) {
  mainColors[i].addEventListener("click", function () {
    let rootValues = getComputedStyle(theRoot);

    if (
      rootValues.getPropertyValue("--main") !==
      mainColors[i].style.backgroundColor
    ) {
      theRoot.style.setProperty("--main", mainColors[i].style.backgroundColor);
    }
    if (rootValues.getPropertyValue("--main") === "rgb(22, 22, 26)") {
      theRoot.style.setProperty("--headline", "rgb(255, 255, 254)");
      theRoot.style.setProperty("--p", "rgb(148, 161, 178)");
      theRoot.style.setProperty("--focus", "rgb(55, 55, 55)");
    } else if (rootValues.getPropertyValue("--main") === "rgb(255, 255, 254)") {
      theRoot.style.setProperty("--headline", "rgb(39, 35, 67)");
      theRoot.style.setProperty("--p", "rgb(45, 51, 74)");
      theRoot.style.setProperty("--focus", "rgb(238, 238, 238)");
    }

    // console.log(`works`);
    // console.log(`point color : ${mainColors[i].style.backgroundColor}`);
  });
}
