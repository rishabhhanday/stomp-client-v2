var UIController = (function () {
    var subId = 0;
    var connectHeaderId = 0;
    var messageHeaderId = 0;
    var headerKeyHtml = '<input type="text" id="%type%-header-key-%headerId%" class="form-control" placeholder="Header name"><br>';
    var headerValueHtml = '<input type="text" id="%type%-header-value-%headerId%" class="form-control" placeholder="Value"><br>';
    var subHtml = '<input type="text" id="subscription-%subId%" class="form-control" placeholder="Stomp Subscription URL"><br>';
    var headerType = {
        connect: 'connect',
        message: 'message'
    };

    var DOMstrings = {
        url: 'url',
        subscription: 'subscription',
        connect: 'connect'
    };

    function addHeader(type) {
        var headerId;
        type === headerType.connect ? headerId = connectHeaderId : headerId = messageHeaderId;


        var newHeaderKeyHtml = headerKeyHtml.replace('%type%', type).replace('%headerId%', headerId);
        var newHeaderValueHtml = headerValueHtml.replace('%type%', type).replace('%headerId%', headerId);
        document.getElementById(type + '-header-key').insertAdjacentHTML('beforeend', newHeaderKeyHtml);
        document.getElementById(type + '-header-value').insertAdjacentHTML('beforeend', newHeaderValueHtml);

        type === headerType.connect ? connectHeaderId++ : messageHeaderId++;
    }

    function getHeaders(type) {
        var headers = {};
        var headerId;
        type === headerType.connect ? headerId = connectHeaderId : headerId = messageHeaderId;

        for (var i = 0; i < headerId; i++) {
            var headerName = document.getElementById(type + '-header-key-' + i).value;
            var headerValue = document.getElementById(type + '-header-value-' + i).value;
            if (headerName !== "")
                headers[headerName.trim()] = headerValue.trim();
        }

        return headers;
    }

    function getSubscriptions() {
        var subscriptionArray = [];

        for (var i = 0; i < subId; i++) {
            var subscribe = document.getElementById('subscription-' + i).value;
            subscriptionArray.push(subscribe.trim());
        }

        return subscriptionArray;
    }

    return {

        getStompData: function () {

            return {
                wsUrl: document.getElementById('url').value.trim(),
                subscription: getSubscriptions(),
                connectHeaders: getHeaders(headerType.connect)
            };
        },

        getDomStrings: function () {
            return DOMstrings;
        },

        addSub: function () {
            var newSubHtml = subHtml.replace('%subId%', subId++);
            document.getElementById('subscription').insertAdjacentHTML('beforeend', newSubHtml);
        },

        addConnectHeader: function () {
            addHeader(headerType.connect);
        },

        showFrames: function (successOrDanger, frame) {
            document.getElementById('frames').insertAdjacentHTML('beforeend', '<tr class="' + successOrDanger + '"><td>' + frame + '</td></tr>');
        },

        showMessageWithDestination(message, destination) {
            document.getElementById('destination').insertAdjacentHTML('beforeend', "<tr class='success'><td>" + destination + "</td></tr>");
            document.getElementById('messages').insertAdjacentHTML('beforeend', "<tr class='success'><td>" + message + "</td></tr>")
        },

        getMessage: function () {
            return {
                destination: document.getElementById('payload-destination').value,
                payload: document.getElementById('payload').value.trim(),
                headers: getHeaders(headerType.message)

            };
        },

        addMessageHeader: function () {
            addHeader(headerType.message);
        },

        setConnected: function (stayConnected) {
            document.getElementById('send-message').disabled = !stayConnected;
            document.getElementById('disconnect').disabled = !stayConnected;
            document.getElementById('connect').disabled = stayConnected;

            document.getElementById('destination').innerHTML = "";
            document.getElementById('messages').innerHTML = "";
        },

        clearFrames: function () {
            document.getElementById('frames').innerHTML = "";
        }

    };

})();

var StompController = (function (uiCtrl) {
    var stompData;
    var stompClient = null;
    var StompData = function (url, connectHeaders, subscribe) {
        this.url = url;
        this.connecHeaders = connectHeaders;
        this.subscribe = subscribe;
    }

    var frameStyle = {
        success: 'success',
        danger: 'danger'
    };

    function getStompMessage(message) {
        uiCtrl.showFrames(frameStyle.success, message);

        uiCtrl.showMessageWithDestination(JSON.stringify(JSON.parse(message.body),undefined,4), message.headers.destination);

    }

    function connectCallBack(frames) {
        uiCtrl.showFrames(frameStyle.success, frames);

        stompData.subscribe.forEach(function (sub) {
            if (sub !== "")
                stompClient.subscribe(sub, getStompMessage);
        });
    }

    function errorCallBack(errorMessage) {
        uiCtrl.showFrames(frameStyle.danger, errorMessage);
        uiCtrl.setConnected(false);
    }

    return {

        setStompData: function (url, connecHeaders, subscribe) {
            stompData = new StompData(url, connecHeaders, subscribe);
        },

        connect: function () {
            /*var socket = new SockJS(stompData.url);*/
            stompClient = Stomp.client(stompData.url);

            stompClient.connect(stompData.connecHeaders, connectCallBack, errorCallBack);
        },

        disconnect: function () {
            stompClient.disconnect();
        },

        publish: function (destination, headers, payload) {
            stompClient.send(destination, headers, payload);
        },

        getStompClient: function () {
            return stompClient;
        }
    };

})(UIController);

var Controller = (function (stompCtrl, uiCtrl) {
    var convertWsToHttp = function (wsURL) {
        return 'http' + wsURL.substring(2);
    }

    var setupEventListener = function () {
        document.getElementById('connect').addEventListener('click', function () {
            var stompData = uiCtrl.getStompData();
            stompCtrl.setStompData(stompData.wsUrl, stompData.connectHeaders, stompData.subscription);
            stompCtrl.connect();

            uiCtrl.setConnected(true);
        });

        document.getElementById('add-sub').addEventListener('click', uiCtrl.addSub)

        document.getElementById('add-connect-header').addEventListener('click', uiCtrl.addConnectHeader);

        document.getElementById('add-message-header').addEventListener('click', uiCtrl.addMessageHeader);

        document.getElementById('send-message').addEventListener('click', function () {
            var stompMessage = uiCtrl.getMessage();

            stompCtrl.publish(stompMessage.destination, stompMessage.headers, stompMessage.payload);
        });

        document.getElementById('disconnect').addEventListener('click', function () {
            stompCtrl.disconnect();
            uiCtrl.setConnected(false);
        });

        document.getElementById('erase').addEventListener('click', uiCtrl.clearFrames)
    }

    return {
        init: function () {
            console.log('application is running');

            setupEventListener();
        }
    };
})(StompController, UIController);

window.addEventListener('load', function () {
    Controller.init();
});
