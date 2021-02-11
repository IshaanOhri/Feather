var create = document.getElementById("create");
var join = document.getElementById("join");
var mouse = document.getElementById("mouse");

join.onclick = async function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();

  setTimeout(() => {
    location.href = "join.html";
  }, 500);
};

create.onclick = function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();

  setTimeout(() => {
    location.href = "create.html";
  }, 500);
};
