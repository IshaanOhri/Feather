var typewriter = document.getElementById("typewriter");
var sessionId = document.getElementById("session-id");
var back = document.getElementById("back");
var enter = document.getElementById("enter");
var mouse = document.getElementById("mouse");

sessionId.oninput = function () {
  typewriter.pause();
  typewriter.currentTime = 0;
  typewriter.play();
};

back.onclick = async function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();

  setTimeout(() => {
    location.href = "index.html";
  }, 500);
};

enter.onclick = function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();

  setTimeout(() => {
    // location.href = "create.html";
  }, 500);
};
