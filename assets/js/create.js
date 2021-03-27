var closeModal = document.getElementById("close-modal");
var infoBtn = document.getElementById("info-btn");
var meetingID = document.getElementById("meeting-id");
var mouse = document.getElementById("mouse");

infoBtn.onclick = function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();

  document.getElementById("temp-background").style.display = "block";
};

closeModal.onclick = function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();

  document.getElementById("temp-background").style.display = "none";
};

meetingID.onclick = function () {
  mouse.pause();
  mouse.currentTime = 0;
  mouse.play();
  
  navigator.clipboard.writeText(meetingID.innerHTML);
  var x = document.getElementById("snackbar");

  x.className = "show";

  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};

var webcamJscii = new Jscii({
  container: document.getElementById("ascii-container-webrtc"),
  el: document.getElementById("jscii-element-webrtc"),
  webrtc: true,
  selfVideo: document.getElementById("self-video"),
  meetingID: meetingID,
});
