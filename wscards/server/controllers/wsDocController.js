import docService from "../service/doc-service.js";

const WsDocController = (socket, user) => {
        socket.on('PostDoc', (data) => {
            const newDoc = data.newDoc;
            const creatorId = data.creatorId;
            newDoc && docService.postNewDoc(creatorId, newDoc).then((addedDoc) => {
                socket.emit('DocAdded', addedDoc);
            });
        });

        socket.on('EditDoc', (data) => {
            const newDoc = data.newDoc;
            newDoc && docService.editDoc(newDoc).then((edittedDoc) => {
                socket.emit('DocEditted', edittedDoc);
            });
            user && docService.editDoc(newDoc);
        });

        socket.on('GetEditableDoc', (data) => {
            const docId = data.docId;
            docId && docService.getDoc(docId).then((doc) => {
                socket.emit('TakeEditableDoc', doc);
            });
        });

        socket.on('DeleteDoc', (data) => {
            const docDecNum = data.docDecNum;
            docDecNum && docService.deleteDoc(docDecNum).then((docDecNum) => {
                socket.emit('TakeDeletedDocDecNum', docDecNum);
            });
        });

        socket.on('SearchDocs', (data) => {
            const searchType = data.searchType;
            const searchPromt = data.searchPromt;
            searchType && docService.searchDocs(searchType, searchPromt).then((docs) => {
                socket.emit('TakeFoundedDocs', docs);
            });
        });
}

export default WsDocController;