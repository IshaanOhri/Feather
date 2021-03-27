var mouse = document.getElementById("mouse");

function mouseClick() {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();
}
new Jscii({
  container: document.getElementById("ascii-container-webrtc"),
  el: document.getElementById("jscii-element-webrtc"),
  webrtc: true,
  selfVideo: document.getElementById("self-video"),
});
