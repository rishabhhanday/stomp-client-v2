export default class StompSend {
    constructor(destination, headers, message) {
        this.destination = destination;
        this.headers = headers;
        this.message = message;
    }
}