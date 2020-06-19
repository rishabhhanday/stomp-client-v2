/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/stomp.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/stomp.js":
/*!*************************!*\
  !*** ./src/js/stomp.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var UIController = (function () {\r\n    var subId = 0;\r\n    var connectHeaderId = 0;\r\n    var messageHeaderId = 0;\r\n    var headerKeyHtml = '<input type=\"text\" id=\"%type%-header-key-%headerId%\" class=\"form-control\" placeholder=\"Header name\"><br>';\r\n    var headerValueHtml = '<input type=\"text\" id=\"%type%-header-value-%headerId%\" class=\"form-control\" placeholder=\"Value\"><br>';\r\n    var subHtml = '<input type=\"text\" id=\"subscription-%subId%\" class=\"form-control\" placeholder=\"Stomp Subscription URL\"><br>';\r\n    var headerType = {\r\n        connect: 'connect',\r\n        message: 'message'\r\n    };\r\n\r\n    var DOMstrings = {\r\n        url: 'url',\r\n        subscription: 'subscription',\r\n        connect: 'connect'\r\n    };\r\n\r\n    function addHeader(type) {\r\n        var headerId;\r\n        type === headerType.connect ? headerId = connectHeaderId : headerId = messageHeaderId;\r\n\r\n\r\n        var newHeaderKeyHtml = headerKeyHtml.replace('%type%', type).replace('%headerId%', headerId);\r\n        var newHeaderValueHtml = headerValueHtml.replace('%type%', type).replace('%headerId%', headerId);\r\n        document.getElementById(type + '-header-key').insertAdjacentHTML('beforeend', newHeaderKeyHtml);\r\n        document.getElementById(type + '-header-value').insertAdjacentHTML('beforeend', newHeaderValueHtml);\r\n\r\n        type === headerType.connect ? connectHeaderId++ : messageHeaderId++;\r\n    }\r\n\r\n    function getHeaders(type) {\r\n        var headers = {};\r\n        var headerId;\r\n        type === headerType.connect ? headerId = connectHeaderId : headerId = messageHeaderId;\r\n\r\n        for (var i = 0; i < headerId; i++) {\r\n            var headerName = document.getElementById(type + '-header-key-' + i).value;\r\n            var headerValue = document.getElementById(type + '-header-value-' + i).value;\r\n            if (headerName !== \"\")\r\n                headers[headerName.trim()] = headerValue.trim();\r\n        }\r\n\r\n        return headers;\r\n    }\r\n\r\n    function getSubscriptions() {\r\n        var subscriptionArray = [];\r\n\r\n        for (var i = 0; i < subId; i++) {\r\n            var subscribe = document.getElementById('subscription-' + i).value;\r\n            subscriptionArray.push(subscribe.trim());\r\n        }\r\n\r\n        return subscriptionArray;\r\n    }\r\n\r\n    return {\r\n\r\n        getStompData: function () {\r\n\r\n            return {\r\n                wsUrl: document.getElementById('url').value.trim(),\r\n                subscription: getSubscriptions(),\r\n                connectHeaders: getHeaders(headerType.connect)\r\n            };\r\n        },\r\n\r\n        getDomStrings: function () {\r\n            return DOMstrings;\r\n        },\r\n\r\n        addSub: function () {\r\n            var newSubHtml = subHtml.replace('%subId%', subId++);\r\n            document.getElementById('subscription').insertAdjacentHTML('beforeend', newSubHtml);\r\n        },\r\n\r\n        addConnectHeader: function () {\r\n            addHeader(headerType.connect);\r\n        },\r\n\r\n        showFrames: function (successOrDanger, frame) {\r\n            document.getElementById('frames').insertAdjacentHTML('beforeend', '<tr class=\"' + successOrDanger + '\"><td>' + frame + '</td></tr>');\r\n        },\r\n\r\n        showMessageWithDestination(message, destination) {\r\n            document.getElementById('destination').insertAdjacentHTML('beforeend', \"<tr class='success'><td>\" + destination + \"</td></tr>\");\r\n            document.getElementById('messages').insertAdjacentHTML('beforeend', \"<tr class='success'><td>\" + message + \"</td></tr>\")\r\n        },\r\n\r\n        getMessage: function () {\r\n            return {\r\n                destination: document.getElementById('payload-destination').value,\r\n                payload: document.getElementById('payload').value.trim(),\r\n                headers: getHeaders(headerType.message)\r\n\r\n            };\r\n        },\r\n\r\n        addMessageHeader: function () {\r\n            addHeader(headerType.message);\r\n        },\r\n\r\n        setConnected: function (stayConnected) {\r\n            document.getElementById('send-message').disabled = !stayConnected;\r\n            document.getElementById('disconnect').disabled = !stayConnected;\r\n            document.getElementById('connect').disabled = stayConnected;\r\n\r\n            document.getElementById('destination').innerHTML = \"\";\r\n            document.getElementById('messages').innerHTML = \"\";\r\n        },\r\n\r\n        clearFrames: function () {\r\n            document.getElementById('frames').innerHTML = \"\";\r\n        }\r\n\r\n    };\r\n\r\n})();\r\n\r\nvar StompController = (function (uiCtrl) {\r\n    var stompData;\r\n    var stompClient = null;\r\n    var StompData = function (url, connectHeaders, subscribe) {\r\n        this.url = url;\r\n        this.connecHeaders = connectHeaders;\r\n        this.subscribe = subscribe;\r\n    }\r\n\r\n    var frameStyle = {\r\n        success: 'success',\r\n        danger: 'danger'\r\n    };\r\n\r\n    function getStompMessage(message) {\r\n        uiCtrl.showFrames(frameStyle.success, message);\r\n\r\n        uiCtrl.showMessageWithDestination(JSON.stringify(JSON.parse(message.body),undefined,4), message.headers.destination);\r\n\r\n    }\r\n\r\n    function connectCallBack(frames) {\r\n        uiCtrl.showFrames(frameStyle.success, frames);\r\n\r\n        stompData.subscribe.forEach(function (sub) {\r\n            if (sub !== \"\")\r\n                stompClient.subscribe(sub, getStompMessage);\r\n        });\r\n    }\r\n\r\n    function errorCallBack(errorMessage) {\r\n        uiCtrl.showFrames(frameStyle.danger, errorMessage);\r\n        uiCtrl.setConnected(false);\r\n    }\r\n\r\n    return {\r\n\r\n        setStompData: function (url, connecHeaders, subscribe) {\r\n            stompData = new StompData(url, connecHeaders, subscribe);\r\n        },\r\n\r\n        connect: function () {\r\n            /*var socket = new SockJS(stompData.url);*/\r\n            stompClient = Stomp.client(stompData.url);\r\n\r\n            stompClient.connect(stompData.connecHeaders, connectCallBack, errorCallBack);\r\n        },\r\n\r\n        disconnect: function () {\r\n            stompClient.disconnect();\r\n        },\r\n\r\n        publish: function (destination, headers, payload) {\r\n            stompClient.send(destination, headers, payload);\r\n        },\r\n\r\n        getStompClient: function () {\r\n            return stompClient;\r\n        }\r\n    };\r\n\r\n})(UIController);\r\n\r\nvar Controller = (function (stompCtrl, uiCtrl) {\r\n    var convertWsToHttp = function (wsURL) {\r\n        return 'http' + wsURL.substring(2);\r\n    }\r\n\r\n    var setupEventListener = function () {\r\n        document.getElementById('connect').addEventListener('click', function () {\r\n            var stompData = uiCtrl.getStompData();\r\n            stompCtrl.setStompData(stompData.wsUrl, stompData.connectHeaders, stompData.subscription);\r\n            stompCtrl.connect();\r\n\r\n            uiCtrl.setConnected(true);\r\n        });\r\n\r\n        document.getElementById('add-sub').addEventListener('click', uiCtrl.addSub)\r\n\r\n        document.getElementById('add-connect-header').addEventListener('click', uiCtrl.addConnectHeader);\r\n\r\n        document.getElementById('add-message-header').addEventListener('click', uiCtrl.addMessageHeader);\r\n\r\n        document.getElementById('send-message').addEventListener('click', function () {\r\n            var stompMessage = uiCtrl.getMessage();\r\n\r\n            stompCtrl.publish(stompMessage.destination, stompMessage.headers, stompMessage.payload);\r\n        });\r\n\r\n        document.getElementById('disconnect').addEventListener('click', function () {\r\n            stompCtrl.disconnect();\r\n            uiCtrl.setConnected(false);\r\n        });\r\n\r\n        document.getElementById('erase').addEventListener('click', uiCtrl.clearFrames)\r\n    }\r\n\r\n    return {\r\n        init: function () {\r\n            console.log('application is running');\r\n\r\n            setupEventListener();\r\n        }\r\n    };\r\n})(StompController, UIController);\r\n\r\nwindow.addEventListener('load', function () {\r\n    Controller.init();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/stomp.js?");

/***/ })

/******/ });