export const elements = {
    connectBtn: document.getElementById("connect"),
    disconnectBtn: document.getElementById("disconnect"),
    sendBtn: document.getElementById("send-message"),
    connectUrl: document.getElementById("url"),
    connectHeaderPlus: document.getElementById("add-connect-header"),
    messageHeaderPlus: document.getElementById("add-message-header"),
    subscriptionPlus: document.getElementById("add-sub"),
    subscription: document.getElementById('subscription'),
    header: (type) => {
        return {
            key: document.getElementById(`${type}-header-key`),
            value: document.getElementById(`${type}-header-value`)
        };
    },
    frames: document.getElementById("frames"),
    headerKeyValueById: (type, id) => {
        return {
            key: document.getElementById(`${type}-header-key-${id}`),
            value: document.getElementById(`${type}-header-value-${id}`)
        }
    },
    subscriptionById: id => document.getElementById(`subscription-${id}`),
   // destination: document.getElementById('destination'),
    message: document.getElementById('messages'),
    payload: document.getElementById('payload'),
    payloadDestination: document.getElementById('payload-destination')
};