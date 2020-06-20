import * as base from "../view/base";
import * as view from "../view/view";

var Stomp = require('stompjs');
let stompClient;
let subscriptions;

const connectCallback = connected => {
    base.clearLoader();
    console.log(connected);
}

const errorCallBack = error => {
    base.clearLoader();
    console.log(subscriptions);
}

export const connect = (stompConnect, stompSubscribe) => {
    try {
        stompClient = Stomp.client(stompConnect.url);

        subscriptions = stompSubscribe;
        stompClient.connect(stompConnect.connectHeaders, connectCallback, errorCallBack);
    } catch (error) {
        base.clearLoader();
    }
};