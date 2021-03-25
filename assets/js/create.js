var closeModal = document.getElementById("close-modal");
var infoBtn = document.getElementById("info-btn");
var meetingID = document.getElementById("meeting-id");

infoBtn.onclick = function () {
  document.getElementById("temp-background").style.display = "block";
};

closeModal.onclick = function () {
  document.getElementById("temp-background").style.display = "none";
};

meetingID.onclick = function () {
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
