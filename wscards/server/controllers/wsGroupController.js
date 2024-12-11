import groupService from "../service/group-service.js"

const WsGroupController = (socket, user) => {
       
        socket.on('CreateNewGroup', (data) => {
            try {
                console.log(data.ownerId + '' + data.label);
                user && groupService.createNewGroup(data.label, data.ownerId, data.users);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('EditGroup', (data) => {
            try {
                user && groupService.editGroup(data._id, data.label, data.ownerId, data.users);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('DeleteGroup', (data) => {
            try {
                user && groupService.deleteGroup(data._id);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('ReceiveUserLoggedInGroups', () => {
            user && groupService.getUserLoggedInGroups(user._id).then((data) => {
                socket.emit('TakeUserLoggedInGroups', data);
            });
        });
        socket.on('ReceiveUserAllGroups', () => {
            user && groupService.getUserAllGroups(user._id).then((data) => {
                socket.emit('TakeUserAllGroups', data);
            });
        });
}

export default WsGroupController;