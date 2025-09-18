let level = 0;
let highScore = 0;
let red = document.querySelector(".red");
let green = document.querySelector(".green");
let yellow = document.querySelector(".yellow");
let purple = document.querySelector(".purple");

let colorstore = [];
let usercolorstore = [];
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  usercolorstore = [];
  h2.innerText = `Level ${++level}`;

  let color = Math.floor(Math.random() * 4) + 1;
  let box;

  if (color === 1) {
    box = red;
    colorstore.push("red");
  } else if (color === 2) {
    box = green;
    colorstore.push("green");
  } else if (color === 3) {
    box = yellow;
    colorstore.push("yellow");
  } else {
    box = purple;
    colorstore.push("purple");
  }

  flash(box);
  console.log("Game sequence:", colorstore);
}

function flash(element) {
  let originalColor = element.style.backgroundColor;
  element.style.backgroundColor = "white";
  setTimeout(() => {
    element.style.backgroundColor = "";
  }, 300);
}

let btn = document.querySelectorAll(".btn");
for (let button of btn) {
  button.addEventListener("click", () => {
    let chosenColor = button.classList[1];
    usercolorstore.push(chosenColor);
    flash(button);
    checkAnswer(usercolorstore.length - 1);
  });
}

let body = document.querySelector("body");
function checkAnswer(currentIndex) {
  if (usercolorstore[currentIndex] === colorstore[currentIndex]) {
    if (usercolorstore.length === colorstore.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    let score = level - 1;
    if (score > highScore) {
      highScore = score;
    }
    h2.innerHTML = `Game Over! Your score was: ${score} <br> High Score: ${highScore} <br> Press any key to restart`;
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "";
    }, 200);
    resetGame();
  }
}

function resetGame() {
  started = false;
  level = 0;
  colorstore = [];
}
