!(function () {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
  
    var chars = [
      "@",
      "#",
      "$",
      "=",
      "*",
      "!",
      ";",
      ":",
      "~",
      "-",
      ",",
      ".",
      "&nbsp;",
      "&nbsp;",
    ];
    var charLen = chars.length - 1;
    function getChar(val) {
      return chars[parseInt(val * charLen, 10)];
    }
  
    function Jscii(params) {
      var self = this;
  
      var el = (this.el = params.el);
      this.container = params.container;
      this.selfVideo = params.selfVideo;
      this.fn = typeof params.fn === "function" ? params.fn : null;
      this.width = typeof params.width === "number" ? params.width : 150;
      this.color = !!params.color;
  
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
  
      var peer = new Peer();
  
      var conn = peer.connect(window.location.search.replace('?roomID=',''));
  
      peer.on("open", function (id) {
  
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((localMediaStream) => {
  
            var call = peer.call(window.location.search.replace('?roomID=',''), localMediaStream);
  
            call.on("stream", function (stream) {
              self.mediaStream = stream;
              el.srcObject = stream;
            });
  
            self.selfVideo.srcObject = localMediaStream;
          });
      });
      
      self.pause().videoTimer = setInterval(function () {
        if (self.mediaStream || !self.webrtc) self.render();
      }, self.interval);
      return self;
    }
    Jscii.prototype.play = function () {
      var self = this;
      self.pause().videoTimer = setInterval(function () {
        if (self.mediaStream || !self.webrtc) self.render();
      }, self.interval);
      return self;
    };
  
    Jscii.prototype.pause = function () {
      if (this.videoTimer) clearInterval(this.videoTimer);
      return this;
    };
  
    Jscii.prototype.dimension = function (width, height) {
      if (typeof width === "number" && typeof height === "number") {
        this._scaledWidth = this.canvas.width = width;
        this._scaledHeight = this.canvas.height = height;
        return this;
      } else {
        return { width: this._scaledWidth, height: this._scaledHeight };
      }
    };
  
    Jscii.prototype.render = function () {
      var el = this.el,
        nodeName = el.nodeName,
        ratio;
      var dim = this.dimension(),
        width,
        height;
      if (!dim.width || !dim.height) {
        ratio =
          nodeName === "IMG"
            ? el.height / el.width
            : el.videoHeight / el.videoWidth;
        this.dimension(this.width, parseInt(this.width * ratio, 10));
        dim = this.dimension();
      }
      width = dim.width;
      height = dim.height;
  
      if (!width || !height) return;
  
      this.ctx.drawImage(this.el, 0, 0, width, height);
      this.imageData = this.ctx.getImageData(0, 0, width, height).data;
      var asciiStr = this.getAsciiString();
      if (this.container) this.container.innerHTML = asciiStr;
      if (this.fn) this.fn(asciiStr);
    };
  
    Jscii.prototype.getAsciiString = function () {
      var dim = this.dimension(),
        width = dim.width,
        height = dim.height;
      var len = width * height,
        d = this.imageData,
        str = "";
  
      var getRGB = function (i) {
        return [d[(i = i * 4)], d[i + 1], d[i + 2]];
      };
  
      for (var i = 0; i < len; i++) {
        if (i % width === 0) str += "\n";
        var rgb = getRGB(i);
        var val = Math.max(rgb[0], rgb[1], rgb[2]) / 255;
        if (this.color)
          str +=
            '<font style="color: rgb(' +
            rgb.join(",") +
            ')">' +
            getChar(val) +
            "</font>";
        else str += getChar(val);
      }
      return str;
    };
  
    window.Jscii = Jscii;
  })();
  