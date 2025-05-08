import groupService from "../service/group-service.js"

const WsGroupController = (socket) => {
       
        socket.on('CreateNewGroup', (data) => {
            try {
                data.userId && groupService.createNewGroup(data.label, data.ownerId, data.users);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('EditGroup', (data) => {
            try {
                data.userId && groupService.editGroup(data._id, data.label, data.ownerId, data.users);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('DeleteGroup', (data) => {
            try {
                data.userId && groupService.deleteGroup(data._id);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('ReceiveUserLoggedInGroups', (data) => {
            data.userId && groupService.getUserLoggedInGroups(data.userId).then((data) => {
                socket.emit('TakeUserLoggedInGroups', data);
            });
        });
        socket.on('ReceiveUserAllGroups', (data) => {
            data.userId && groupService.getUserAllGroups(data.userId).then((data) => {
                socket.emit('TakeUserAllGroups', data);
            });
        });
}

export default WsGroupController;