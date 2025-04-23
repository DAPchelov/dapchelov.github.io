import docService from "../service/doc-service.js";

const WsDocController = (socket, user) => {

        // socket.on('GetCards', (data) => {
        //     let groupId = data.groupId;
        //     user && cardService.getUserCards(groupId).then((data) => {
        //         socket.emit('TakeCards', data);
        //     });
        //     console.log('GetCards groupId: ' + groupId);
        // });
        socket.on('PostDoc', (data) => {
            const newDoc = data.newDoc;
            const creatorId = data.creatorId;
            user && docService.postNewDoc(creatorId, newDoc).then((addedDoc) => {
                socket.emit('DocAdded', addedDoc);
            });
            // user && docService.postNewDoc(creatorId, newDoc).then(() => {
            //     takeCards(socket, groupId)
            // });
        });

        socket.on('EditDoc', (data) => {
            const newDoc = data.newDoc;
            user && docService.editDoc(newDoc).then((edittedDoc) => {
                socket.emit('DocEditted', edittedDoc);
            });
            user && docService.editDoc(newDoc);
        });

        socket.on('GetEditableDoc', (data) => {
            const docId = data.docId;
            user && docService.getDoc(docId).then((doc) => {
                socket.emit('TakeEditableDoc', doc);
            });
        });

        socket.on('DeleteDoc', (data) => {
            const docDecNum = data.docDecNum;
            user && docService.deleteDoc(docDecNum).then((docDecNum) => {
                socket.emit('TakeDeletedDocDecNum', docDecNum);
            });
        });

        socket.on('SearchDocs', (data) => {
            const searchType = data.searchType;
            const searchPromt = data.searchPromt;
            user && docService.searchDocs(searchType, searchPromt).then((docs) => {
                socket.emit('TakeFoundedDocs', docs);
            });
        });
}

export default WsDocController;