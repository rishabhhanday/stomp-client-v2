export const elements = {
    connectBtn: document.getElementById("connect"),
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
    subscriptionById: id => document.getElementById(`subscription-${id}`)
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};