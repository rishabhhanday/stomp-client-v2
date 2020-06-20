import { elements } from "./base";

let connectHeaderId = 0,
    messageHeaderId = 0,
    subId = 0;

const headerType = {
    connect: 'connect',
    message: 'message'
};

const addHeader = (type, headerId) => {
    elements.header(type).key.insertAdjacentHTML('beforeend', `<input type="text" id="${type}-header-key-${headerId}" class="form-control" placeholder="Header name"><br>`);
    elements.header(type).value.insertAdjacentHTML('beforeend', `<input type="text" id="${type}-header-value-${headerId}" class="form-control" placeholder="Value"><br>`);
};

const getHeaders = type => {
    const headers = new Map();

    for (let id = 0; id < (type === headerType.connect ? connectHeaderId : messageHeaderId); id++) {
        if (elements.headerKeyValueById(type, id).key.value.trim() !== "")
            headers.set(elements.headerKeyValueById(type, id).key.value.trim(), elements.headerKeyValueById(type, id).value.value.trim());
    }

    return headers;
};

export const getConnectUrl = () => elements.connectUrl.value.trim();

export const addConnectHeader = () => { addHeader(headerType.connect, connectHeaderId++); };

export const addMessageHeader = () => { addHeader(headerType.message, messageHeaderId++); };

export const addSub = () => {
    elements.subscription.insertAdjacentHTML('beforeend', `<input type="text" id="subscription-${subId++}" class="form-control" placeholder="Stomp Subscription URL"><br>`);
};

export const getConnectHeaders = () => getHeaders(headerType.connect);

export const getMessageHeaders = () => getHeaders(headerType.message);

export const getSubscriptions = () => {
    const subscriptions = [];

    for (let id = 0; id < subId; id++) {
        elements.subscriptionById(id).value.trim() !== "" ? subscriptions.push(elements.subscriptionById(id).value.trim()) : {};
    }

    return subscriptions;
};