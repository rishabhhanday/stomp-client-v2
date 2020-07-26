import * as view from "../view/view";

var stompjs = require('stompjs');
var beautify = require("json-beautify");

let stompClient;
let subscriptionsArray;
let subscribeMap = new Map();

const getStompMessage = messageFrame => {
    // view.showFrames(view.frameType.success, messageFrame);

    const message = {
        destination: messageFrame.headers.destination,
        body: JSON.parse(messageFrame.body)
    }

    view.showMessageWithDestination(beautify(message, null, 2));
};

const connectCallback = connected => {
    view.stayConnected(true);
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
        stompClient = stompjs.client(stompConnect.url);

        subscriptionsArray = stompSubscribe.subscriptions;

        stompClient.connect(stompConnect.connectHeaders, connectCallback, errorCallBack);
    } catch (error) {
        console.log(error);
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
