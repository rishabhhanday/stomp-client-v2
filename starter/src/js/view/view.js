import { elements } from "./base";

let connectHeaderId = 1,
    messageHeaderId = 1,
    subId = 1;

const headerType = {
    connect: 'connect',
    message: 'message'
};

const addHeader = (type, headerId) => {
    elements.header(type).key.insertAdjacentHTML('beforeend', `<input type="text" id="${type}-header-key-${headerId}" class="form-control" placeholder="Header name"><br>`);
    elements.header(type).value.insertAdjacentHTML('beforeend', `<input type="text" id="${type}-header-value-${headerId}" class="form-control" placeholder="Value"><br>`);
};

const getHeaders = type => {
    const headers = {};

    for (let id = 0; id < (type === headerType.connect ? connectHeaderId : messageHeaderId); id++) {
        if (elements.headerKeyValueById(type, id).key.value.trim() !== "")
            headers[elements.headerKeyValueById(type, id).key.value.trim()] = elements.headerKeyValueById(type, id).value.value.trim();
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


export const stayConnected = (status) => {
    elements.connectBtn.disabled = status;
    elements.sendBtn.disabled = !status;
    elements.disconnectBtn.disabled = !status;

    if (status === true) {
        elements.frames.innerHTML = "";
        elements.message.innerHTML = "";
        // elements.destination.innerHTML = "";
    }
};

export const frameType = {
    success: 'success',
    danger: 'danger'
};

export const showFrames = (frameType, frame) => {
    elements.frames.insertAdjacentHTML('beforeend', `<tr class="${frameType}"><td>${frame}</td></tr>`);
};

/* export const showMessageAndDestination = (message, destination) => {
    elements.message.insertAdjacentHTML('beforeend', `<tr class='success'><td>${message}</td></tr>`);
    elements.destination.insertAdjacentHTML('beforeend', `<tr class='success'><td>${destination}</td></tr>`);
}; */

export const showMessageWithDestination = message => {
    elements.message.insertAdjacentHTML('beforeend', `<tr><pre>${message}</pre></tr>`);

    // elements.message.value += `${message} \n\n`;
};

export const getPaylaodDestination = () => {
    return elements.payloadDestination.value.trim();
};

export const getPayload = () => {
    return elements.payload.value.trim();
};