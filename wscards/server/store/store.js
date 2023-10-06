import { io } from '../index';

class Store {
    constructor(socket) {
        this.socket = socket
    }
    logId() {
        console.log(this.socket.id);
    }
};

io.on('connection', socket => {
    const userStore = new Store(socket);
    userStore.logId();
});



export default Store;