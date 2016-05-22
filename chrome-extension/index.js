var ws;


function openConnection() {

    ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = function(e) {
        var data = JSON.parse(e.data);

        chrome.tabs.executeScript({
            file: 'popup.js'
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, data, function() {});
        });
    };

    ws.onclose = function() {
        ws = undefined;
    }

    ws.onerror = function() {
        ws = undefined;
    }

}

chrome.alarms.create({when: Date.now() + 1000, periodInMinutes: 15});

chrome.alarms.onAlarm.addListener(function() {
    if (ws === undefined) {
        openConnection();
    }
});
