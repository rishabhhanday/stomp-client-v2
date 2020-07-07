import * as view from "../view/view";

var Stomp = require('stompjs');
var beautify = require("json-beautify");

let stompClient;
let subscriptionsArray;
let subscribeMap = new Map();

const getStompMessage = message => {
    view.showFrames(view.frameType.success, message);

    view.showMessageAndDestination(beautify(JSON.parse(message.body), null, 2, 100), message.headers.destination);

    console.log(beautify(JSON.parse(message.body), null, 2, 100));
};

const connectCallback = connected => {
    view.showFrames(view.frameType.success, connected);

    subscriptionsArray.forEach(sub => {
        const subscriptionUniqueId = stompClient.subscribe(sub, getStompMessage);

        subscribeMap.set(sub, subscriptionUniqueId);
    });
};

const errorCallBack = error => {
    view.stayConnected(false);

    view.showFrames(view.frameType.danger, error);
};

export const connect = (stompConnect, stompSubscribe) => {
    try {
        stompClient = Stomp.client(stompConnect.url);

        subscriptionsArray = stompSubscribe.subscriptions;

        stompClient.connect(stompConnect.connectHeaders, connectCallback, errorCallBack);
    } catch (error) {
        view.stayConnected(false);

        view.showFrames(view.frameType.danger, error);
    }
};

export const sendMessage = (stompSend) => {
    stompClient.send(stompSend.destination, stompSend.headers, stompSend.message);
};

export const disconnect = () => {
    stompClient.disconnect((() => {
        view.showFrames(view.frameType.success, 'DISCONNECTED');
    }));
};

export const unsubscribe = sub => {
    subscribeMap.get(sub).unsubscribe();
}
