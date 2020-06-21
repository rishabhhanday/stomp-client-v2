import * as view from "../view/view";

var Stomp = require('stompjs');
let stompClient;
let subscriptionsArray;

const getStompMessage = message => {
    view.showFrames(view.frameType.success, message);

    view.showMessageAndDestination(JSON.stringify(JSON.parse(message.body), undefined, 4), message.headers.destination);
};

const connectCallback = connected => {
    view.showFrames(view.frameType.success, connected);

    subscriptionsArray.forEach(sub => {
        stompClient.subscribe(sub, getStompMessage);
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

export const disconnect = ()=>{
    stompClient.disconnect();
};
