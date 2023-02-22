let obj_1 = {
  subName: "Subject 1",
  hrs: 0,
  percentage: 0,
  "col-height": 0,
};

let obj_2 = {
  subName: "Subject 2",
  hrs: 0,
  percentage: 0,
  "col-height": 0,
};

let obj_3 = {
  subName: "Subject 3",
  hrs: 0,
  percentage: 0,
  "col-height": 0,
};

let obj_4 = {
  subName: "Subject 4",
  hrs: 0,
  percentage: 0,
  "col-height": 0,
};

let obj_5 = {
  subName: "Subject 5",
  hrs: 0,
  percentage: 0,
  "col-height": 0,
};

let obj_6 = {
  subName: "Subject 6",
  hrs: 0,
  percentage: 0,
  "col-height": 0,
};

let objArr = [obj_1, obj_2, obj_3, obj_4, obj_5, obj_6]; // stores objects data

if (localStorage.getItem("Subjects Data")) {
  // if there is a local storage
  objArr = JSON.parse(localStorage.getItem("Subjects Data")); // make the array values = local storage data
}

localStorage.setItem("Subjects Data", JSON.stringify(objArr)); // stores data in local storage

const hrsInput = document.querySelectorAll(".hrs-num"); // numbers input
const hrs = document.querySelectorAll(".hrs"); // hrs studied

// + and - btns
const addHrsBtn = document.querySelectorAll(".add-remove .plus");
const decreaseHrsBtn = document.querySelectorAll(".add-remove .minus");

// function to change data in local storage
function changeObjDataInLS(arr) {
  localStorage.setItem("Subjects Data", JSON.stringify(arr));
}

// to make enter click add button
hrsInput.forEach((element, index) => {
  element.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      addHrsBtn[index].click();
    }
  });
});

//function for adding hours
addHrsBtn.forEach((element, index) => {
  element.addEventListener("click", function () {
    objArr[index].hrs += Number(hrsInput[index].value);
    changeObjDataInLS(objArr);
    calculatePercentages();
    columnHeight();
    visualizeData();
    hrsInput[index].value = "";
  });
});

//function for decreasing hours
decreaseHrsBtn.forEach((element, index) => {
  element.addEventListener("click", function () {
    objArr[index].hrs -= Number(hrsInput[index].value);
    changeObjDataInLS(objArr);
    calculatePercentages();
    columnHeight();
    visualizeData();
    hrsInput[index].value = "";
  });
});

function customizeArrData() {
  return (objArr = JSON.parse(localStorage.getItem("Subjects Data"))); // transforming local storage data to array to change values
}

function calculatePercentages() {
  customizeArrData();
  let perceOfSub = [],
    sum = 0;

  objArr.forEach((element, index) => {
    perceOfSub[index] = element.hrs;
  });

  for (let i = 0; i < perceOfSub.length; i++) {
    sum += perceOfSub[i];
  }

  objArr.forEach((element, index) => {
    element.percentage = Math.round((perceOfSub[index] / sum) * 100);
  });

  localStorage.setItem("Subjects Data", JSON.stringify(objArr));
}

function columnHeight() {
  customizeArrData(); // call function to get array of data

  let colHeights = [];
  let allHrs = [];

  objArr.forEach((element, index) => {
    colHeights[index] = element["col-height"];
  });

  objArr.forEach((element, index) => {
    allHrs[index] = element.hrs;
  });

  let maxHrs = Math.max(...allHrs);

  objArr.forEach((element) => {
    element["col-height"] = Math.round((element.hrs / maxHrs) * 100);
  });

  localStorage.setItem("Subjects Data", JSON.stringify(objArr));
}

function visualizeData() {
  customizeArrData(); // call function to get array of data

  let columns = document.querySelectorAll(".col");
  let hours = document.querySelectorAll(".hrs");
  let percentages = document.querySelectorAll(".percent");

  columns.forEach((element, index) => {
    element.style.height = `${objArr[index]["col-height"]}%`;
  });

  hours.forEach((element, index) => {
    element.innerHTML = objArr[index].hrs;
  });

  percentages.forEach((element, index) => {
    element.innerHTML = `${objArr[index].percentage}%`;
  });

  let subInPercentage = document.querySelectorAll(".chart-data p");
  let subInCards = document.querySelectorAll(".sub h2");
  let subInNav = document.querySelectorAll("nav .sub-list li p");
  let subBtns = document.querySelectorAll(".data-list li");

  subInNav.forEach((element, index) => {
    element.innerHTML = objArr[index].subName;
  });

  subInCards.forEach((element, index) => {
    element.innerHTML = objArr[index].subName;
  });

  subBtns.forEach((element, index) => {
    element.innerHTML = objArr[index].subName;
  });

  subInPercentage.forEach((element, index) => {
    element.innerHTML = `<span class="dot"></span>${objArr[index].subName}: <span class="percent">${objArr[index].percentage}%</span>`;
  });
}

visualizeData();

//clear data button
const clearBtn = document.querySelector(".clear");

function clearAll() {
  customizeArrData(); // call function to get array of data
  objArr = [obj_1, obj_2, obj_3, obj_4, obj_5, obj_6]; // back to normal
  localStorage.setItem("Subjects Data", JSON.stringify(objArr)); // set local storage data to normal

  visualizeData(); // to view changes
}

clearBtn.addEventListener("click", function () {
  clearAll();
});

// changing names by user
let subBtns = document.querySelectorAll(".data-list li");
let dropMenu = document.querySelector(".drop-menu");
let nameInp = document.querySelector(".name-inp");
let saveNameBtn = document.querySelector(".save-data");

subBtns.forEach((element, index) => {
  element.addEventListener("click", function () {
    dropMenu.style.top = 0;
    element.classList.add("clicked");
  });
});

// to make enter click add button
nameInp.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    saveNameBtn.click();
  }
});

saveNameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  subBtns.forEach((element, index) => {
    if (element.classList.contains("clicked")) {
      changeSubName(index);
    }
  });
  dropMenu.style.top = `-100%`;
  subBtns.forEach((element) => {
    element.classList.remove("clicked");
  });
});

function changeSubName(index) {
  customizeArrData(); // call function to get array of data
  objArr[index].subName = nameInp.value;

  localStorage.setItem("Subjects Data", JSON.stringify(objArr));

  nameInp.value = "";

  visualizeData();
}

// to exit drop menu
document.querySelector(".close").addEventListener("click", function () {
  dropMenu.style.top = "-100%";

  subBtns.forEach((element) => {
    element.classList.remove("clicked");
  });
});
