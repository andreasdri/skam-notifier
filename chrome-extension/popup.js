/***********************
* Notifier.js - Developed by rlemon (rob.lemon@gmail.com) https://github.com/rlemon/Notifier.js
* Licensed under GNU GPL V3 https://github.com/rlemon/Notifier.js/blob/master/LICENSE
***********************/
var Notifier = (function() {
    var apply_styles = function(element, style_object) {
        for (var prop in style_object) {
            element.style[prop] = style_object[prop];
        }
    };
    var config = {
        /* container for the notifications */
        container: document.createElement('div'),
        /* container styles for notifications */
        container_styles: {
            position: "fixed",
            zIndex: 99999,
            right: "12px",
            top: "12px"
        },
        /* individual notification box styles */
        box_styles: {
            cursor: "pointer",
            padding: "12px 18px",
            margin: "0 0 6px 0",
            backgroundColor: "#000",
            opacity: 0.8,
            color: "#fff",
            font: "normal 13px 'Lucida Sans Unicode', 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif",
            borderRadius: "3px",
            boxShadow: "#999 0 0 12px",
            width: "400px"
        },
        /* individual notification box hover styles */
        box_styles_hover: {
            opacity: 1,
            boxShadow: "#000 0 0 12px"
        },
        /* notification title text styles */
        title_styles: {
            fontWeight: "700"
        },
        /* notification body text styles */
        text_styles: {
            display: "inline-block",
            verticalAlign: "middle",
            width: "260px",
            padding: "0 12px",
            wordWrap: 'break-word'
        },
        /* notification icon styles */
        icon_styles: {
            display: "inline-block",
            verticalAlign: "middle",
            height: "36px"
        }
    };
    apply_styles(config.container, config.container_styles);
    document.body.appendChild(config.container);
    return {
        notify: function(message, title) {
            console.log(message);
            var notification = document.createElement('div');
            apply_styles(notification, config.box_styles);

            notification.onmouseover = function() {
                apply_styles(this, config.box_styles_hover);
            };
            notification.onmouseout = function() {
                apply_styles(this, config.box_styles);
            };
            notification.onclick = function() {
                this.style.display = 'none';
            };

            var icon = document.createElement('img');
            icon.src = chrome.extension.getURL("skam.jpg");;
            apply_styles(icon, config.icon_styles);

            notification.appendChild(icon);

            var text = document.createElement('div');
            apply_styles(text, config.text_styles);

            notification.appendChild(text);

            if (title) {
                var title_text = document.createElement('div');
                apply_styles(title_text, config.title_styles);
                title_text.appendChild(document.createTextNode(title));
                text.appendChild(title_text);
            }

            if (message) {
                var message_text = document.createElement('a');
                message_text.href = message;
                message_text.target = "_blank";
                message_text.appendChild(document.createTextNode(message));
                text.appendChild(message_text);
            }

            config.container.insertBefore(notification, config.container.firstChild);

        },
        info: function(message, title) {
            this.notify(message, title);
        }
    };
}());


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!sender.tab) {
        Notifier.info(request.link, "NYTT SKAM-INNLEGG:");
    }
  });
