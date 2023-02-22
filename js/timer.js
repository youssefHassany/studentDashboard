let setTimerBtn = document.querySelector(".timer-btn");
let timerMenu = document.querySelector(".timer-menu");
let minInp = document.querySelector("#mins");
// let secInp = document.querySelector("#sec");
let saveTimeBtn = document.querySelector(".set-time");
let timeMsg = document.querySelector(".time-finish-menu");

setTimerBtn.addEventListener("click", function () {
  timerMenu.classList.add("drop");
});

minInp.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    saveTimeBtn.click();
  }
});

saveTimeBtn.addEventListener("click", function (el) {
  el.preventDefault();

  let settedTime = minInp.value;
  let totalTime = settedTime * 60;

  function countingTimefunction() {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector(".timer h1").innerHTML = `${minutes}:${seconds}`;

    totalTime--;
    console.log(totalTime);

    if (totalTime === -1) {
      clearInterval(myTimer);
      timeMsg.classList.add("time-over");
      document.querySelector("audio").play();
    }
  }

  var myTimer = setInterval(countingTimefunction, 1000);

  timerMenu.classList.remove("drop");
});

document.querySelector(".conf").onclick = function () {
  timeMsg.classList.remove("time-over");
};

document.querySelector(".close-time").addEventListener("click", function () {
  timerMenu.classList.remove("drop");
});
