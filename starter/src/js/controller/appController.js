import { elements, renderLoader } from "../view/base";
import * as view from "../view/view";
import StompConnect from "../model/StompConnect";
import StompSubscribe from "../model/StompSubscribe";
import * as stompService from "../service/stompService";


elements.connectBtn.addEventListener('click', () => {
    renderLoader(elements.frames);

    const stompConnect = new StompConnect(view.getConnectUrl(), view.getConnectHeaders());
    const stompSubscribe = new StompSubscribe(view.getSubscriptions());

    stompService.connect(stompConnect, stompSubscribe);
});

elements.connectHeaderPlus.addEventListener('click', view.addConnectHeader);

elements.messageHeaderPlus.addEventListener('click', view.addMessageHeader);

elements.subscriptionPlus.addEventListener('click', view.addSub);