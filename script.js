var buttonColor = ["red", "blue", "green", "yellow"];
var gameSequence = [];
var userChosenColor = [];

var level = 0;
var started = false;

$(document).keypress(function (e) {
  var key = e.key;
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  var clickedColor = $(this).attr("id");
  userChosenColor.push(clickedColor);
  playSound(clickedColor);
  animatePressed(clickedColor);
  checkAnswer(userChosenColor.length - 1);
});

function checkAnswer(currentLevel) {
  if (gameSequence[currentLevel] == userChosenColor[currentLevel]) {
    if (userChosenColor.length === gameSequence.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userChosenColor = [];
  level++;
  $("#level-title").text("Level " + level);

  var num = Math.random() * 4;
  num = Math.floor(num);
  var randomColor = buttonColor[num];
  gameSequence.push(randomColor);

  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomColor);
}

function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePressed(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function startOver() {
  gameSequence = [];
  level = 0;
  started = false;
}
