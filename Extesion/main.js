var port = null;

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}
                             

function appendMessage(text) {  
 if (port !== null) {
  if (text.indexOf("Label:") == 22) {
	  document.getElementById('blabel').innerHTML += "<h5>Label<br /><small>" + '"' + text.substring(29) + "</small></h5>";
  } else if (text.indexOf("policy_end_datetime:") == 22) {
	  document.getElementById('pol&dt').innerHTML += "<h5>Policy & date time<br /><small>" + '"' + text.substring(43)  + "</small></h5>";
  } else if (text.indexOf("log:") == 22) {
	  document.getElementById('log-journal').innerHTML += "<tr><td>" + text.substring((text.indexOf("Level:") + 6), (text.indexOf("Date:") - 2)) + 
	                                                      "</td><td>"+ text.substring((text.indexOf("Date:") + 5), (text.indexOf("Message:") - 2))  + 
	                                                      "</td><td>" + '"' + text.substring(text.indexOf("Message:") + 8)  + "</td></tr>";
  } else if (text.indexOf("knownnodes:") == 22) {
	  document.getElementById('kn-net').innerHTML += "<ul><li>" + text + "</li></ul>";  
  } else {
	  document.getElementById('response').innerHTML += "<div class='alert alert-info'><span>" + text + "</span></div>";	  
  }
 }
}

function updateUiState() {
  if (port) {
    document.getElementById('connect-button').style.display = 'none';
    document.getElementById('acc-data').style.display = 'block';
    document.getElementById('disconnect-button').style.display = 'block';
  } else {
    document.getElementById('connect-button').style.display = 'block';
    document.getElementById('acc-data').style.display = 'none';
    document.getElementById('disconnect-button').style.display = 'none';
    document.getElementById('logs').style.display = 'none';
    document.getElementById('net-info').style.display = 'none';
	document.getElementById('net-dash').style.display = 'none';
  }
}

function onLogging() {
	document.getElementById('logs').style.display = 'block';
	document.getElementById('connection').style.display = 'none';
	document.getElementById('net-info').style.display = 'none';
	document.getElementById('net-dash').style.display = 'none';	
	document.getElementById('acc-btn').classList.remove("active");
	document.getElementById('net-btn').classList.remove("active");
	document.getElementById('log-btn').classList.add("active");
}

function onAccess() {
	document.getElementById('logs').style.display = 'none';
	document.getElementById('net-info').style.display = 'none';
	document.getElementById('net-dash').style.display = 'none';
	document.getElementById('connection').style.display = 'block';
	document.getElementById('log-btn').classList.remove("active");
	document.getElementById('net-btn').classList.remove("active");
	document.getElementById('acc-btn').classList.add("active");
}

function onNetwork() {
	demo.initChartist();
	document.getElementById('logs').style.display = 'none';
	document.getElementById('connection').style.display = 'none';
	document.getElementById('net-info').style.display = 'block';
	document.getElementById('net-dash').style.display = 'block';
	document.getElementById('log-btn').classList.remove("active");
	document.getElementById('acc-btn').classList.remove("active");
	document.getElementById('net-btn').classList.add("active");
}



function sendNativeMessage() {
  message = {"text": document.getElementById('input-text').value};
  port.postMessage(message);
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

function onNativeMessage(message) {
   appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function onDisconnected() {
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function onDisconnect() {
  appendMessage("Disconnect");
  port = null;
  updateUiState();
  location.reload();
}

function connect() {
  var hostName = "com.google.chrome.example.echo";
  appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage); 
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}



document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('connect-button').addEventListener(
      'click', connect);
  document.getElementById('disconnect-button').addEventListener(
      'click', onDisconnect);
  document.getElementById('log-btn').addEventListener(
      'click', onLogging);
  document.getElementById('acc-btn').addEventListener(
      'click', onAccess);  
  document.getElementById('net-btn').addEventListener(
      'click', onNetwork);     
  updateUiState();  
});



