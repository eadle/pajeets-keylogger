var ws = new WebSocket("ws://hostname:port");

ws.onopen = function() {
  ws.send("new session");
}

browser.runtime.onMessage.addListener(notify);

function notify(message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}


