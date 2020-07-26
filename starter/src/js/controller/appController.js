import { elements } from "../view/base";
import * as view from "../view/view";
import StompConnect from "../model/StompConnect";
import StompSubscribe from "../model/StompSubscribe";
import StompSend from "../model/StompSend";
import * as stompService from "../service/stompService";
var beautify = require("json-beautify");


const test = () => {
    const errorMessage = {
        errorCode: '12001',
        errorMessage: 'x-wp-correlation-id header is missing'
    }

    const message = {
        destination: '/reply/v1/error',
        body: errorMessage
    }

    view.showMessageWithDestination(beautify(message, null, 2, 100));
};

elements.connectBtn.addEventListener('click', () => {
    // test();

    view.stayConnected(true);

    const stompConnect = new StompConnect(view.getConnectUrl(), view.getConnectHeaders());
    const stompSubscribe = new StompSubscribe(view.getSubscriptions());

    stompService.connect(stompConnect, stompSubscribe);
});

elements.connectHeaderPlus.addEventListener('click', view.addConnectHeader);

elements.messageHeaderPlus.addEventListener('click', view.addMessageHeader);

elements.subscriptionPlus.addEventListener('click', view.addSub);

elements.sendBtn.addEventListener('click', () => {
    const stompSend = new StompSend(view.getPaylaodDestination(), view.getMessageHeaders(), view.getPayload());

    stompService.sendMessage(stompSend);
});

elements.disconnectBtn.addEventListener('click', () => {
    view.stayConnected(false);

    stompService.disconnect();
});

window.unsubscribe = stompService.unsubscribe;