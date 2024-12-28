import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";

export interface IAddedDoc {
    _id: string,
    docDecNum: string,
}

export interface IEditableDoc {
    _id: string,
    creatorId: string,
    docDecNum: string,
    docName: string,
    prodName: string,
    folderNum: string,
}

class NewDocController {

    _id: string = '';
    creatorId: string = '';
    docDecNum: string = '';
    docName: string = '';
    prodName: string = '';
    folderNum: string = '';

    socket: Socket = {} as Socket;

    addedDocs: IAddedDoc[] = [];
    foundDocs: IEditableDoc[] = [];

    constructor(_id: string, creatorId: string, docDecNum: string, docName: string, prodName: string, folderNum: string, socket: Socket) {

        this._id = _id;
        this.creatorId = creatorId;
        this.docDecNum = docDecNum;
        this.docName = docName;
        this.prodName = prodName;
        this.folderNum = folderNum;
        this.socket = socket;
        makeAutoObservable(this);

        this.socket.on('DocAdded', async (addedDoc: IAddedDoc | null) => {
            if (addedDoc === null) {
                alert('Ошибка, документ не добавлен');
            } else {
                this.addedDocs.length > 0 && this.filterAddedDocsById(addedDoc._id);
                this.addedDocs.push(addedDoc);
            };
        });
        this.socket.on('DocEditted', async (edittedDoc: IAddedDoc | null) => {
            if (edittedDoc === null) {
                alert('Ошибка, документ не изменён');
            } else {
                this.addedDocs.length > 0 && this.filterAddedDocsById(edittedDoc._id);
                this.addedDocs.push(edittedDoc);
            };
        });
        this.socket.on('TakeEditableDoc', async (editableDoc: IEditableDoc | null) => {
            if (editableDoc === null) {
                alert('Ошибка, документ не найден');
            } else {
                this.set_id(editableDoc._id);
                this.setCreatorId(editableDoc.creatorId);
                this.setDocDecNum(editableDoc.docDecNum);
                this.setDocName(editableDoc.docName);
                this.setProdName(editableDoc.prodName);
                this.setFolderNum(editableDoc.folderNum);
            }
        });
        this.socket.on('TakeDeletedDocDecNum', async (deletedDocDecNum: string | null) => {
            if (deletedDocDecNum === null) {
                alert('Ошибка, документ не найден');
            } else {
                this.filterAddedDocsByDocDecNum(deletedDocDecNum);
            }
        });
        this.socket.on('TakeFoundedDocs', async (foundedDocs: IEditableDoc[] | null) => {
            if (foundedDocs === null) {
                alert('Ошибка, документы не найдены');
            } else {
                this.foundDocs = foundedDocs;
            }
        });
    }

    set_id(_id: string) {
        this._id = _id;
    }
    setCreatorId(newCreatorId: string) {
        this.creatorId = newCreatorId;
    }
    setDocDecNum(newDocDecNum: string) {
        this.docDecNum = newDocDecNum;
    }
    setDocName(newDocName: string) {
        this.docName = newDocName;
    }
    setProdName(newProdName: string) {
        this.prodName = newProdName;
    }
    setFolderNum(newFolderNum: string) {
        this.folderNum = newFolderNum;
    }
    pushAddedDoc(newDoc: IAddedDoc) {
        this.addedDocs.push(newDoc);
    }

    promtNextDocDecNum() {
        const regexDocDecNum = /^[А-Я]{1}[0-9А-Я]{1}.{1}[0-9А-Я]{1}.{1}[0-9]{3}[-0-9]{1}([0-9]{0,1})?([-]{0,1})?0$/;
        if (this.docDecNum.match(regexDocDecNum)) {
            const newDocNum = Number(this.docDecNum.split('.')[1].split('-0')[0]) + 1;
            const docNum = this.docDecNum.split('.')[0] + '.' + newDocNum.toString() + '-0';
            this.docDecNum = docNum;
        } else {
            this.docDecNum = '';
        }
    }

    checkDocFields() {
        if (this.docDecNum.length === 0) {
            alert('Заполните обозначение документа')
            return (false);
        }
        if (this.docName.length === 0) {
            alert('Заполните наименование документа')
            return (false);
        }
        if (this.folderNum.length === 0) {
            alert('Заполните номер папки')
            return (false);
        }
        return true;
    }

    clearForm() {
        this.setDocDecNum('');
        this.setDocName('');
        this.setProdName('');
        this.setFolderNum('');
    }

    getEditableDoc(docId: string | number) {
        this.socket.emit('GetEditableDoc', { docId: docId })
    }

    deleteDoc() {
        this.socket.emit('DeleteDoc', { docDecNum: this.docDecNum })
        this.clearForm();
    }

    searchDocs(searchType: string, searchPromt: string) {
        this.socket.emit('SearchDocs', {searchType: searchType, searchPromt: searchPromt});
    }
    // setTodos(todos: ITodo[]) {
    //     this.todos = todos;
    // }

    // clearCard() {
    //     this.setTodos([]);
    //     this.setMessage('');
    // }

    // addTodo(postMessage: string, postIsCompleted: boolean) {
    //     const newTodo: ITodo = {
    //         message: postMessage,
    //         isCompleted: postIsCompleted,
    //         // add TEMP todo IDs only for normal rendering <TodoFields> in <InputForm>
    //         _id: uuidv4(),
    //     };
    //     this.todos.push(newTodo);
    // }

    // removeTodo(id: ITodo['_id']) {
    //     this.setTodos(this.todos.filter(todo => todo._id !== id));
    // }

    // checkTodo(id: ITodo['_id']) {
    //     const todo = this.todos.find(todo => todo._id === id);
    //     if (todo) {
    //         todo.isCompleted = !todo.isCompleted
    //     }
    // }
    // setTodoMessage(message: string, id?: string) {
    //     const todo = this.todos.find(todo => todo._id === id);
    //     if (todo) {
    //         todo.message = message
    //     }
    // }

    postDoc(creatorId: string) {
        try {
            const newDoc = {
                creatorId: creatorId,
                docDecNum: this.docDecNum,
                docName: this.docName,
                prodName: this.prodName,
                folderNum: this.folderNum,
            };
            if (this.checkDocFields()) {
                this.socket.emit('PostDoc', { newDoc: newDoc, creatorId });
                this.docName = '';
                this.promtNextDocDecNum();
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    editDoc() {
        try {
            const editableDoc = {
                _id: this._id,
                creatorId: this.creatorId,
                docDecNum: this.docDecNum,
                docName: this.docName,
                prodName: this.prodName,
                folderNum: this.folderNum,
            };
            if (this.checkDocFields()) {
                this.checkDocFields();
                this.clearForm();

                this.socket.emit('EditDoc', { newDoc: editableDoc });
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    filterAddedDocsById(docId: string) {
        this.addedDocs = this.addedDocs.filter((doc) => doc._id !== docId);
    }
    filterAddedDocsByDocDecNum(docDecNum: string) {
        this.addedDocs = this.addedDocs.filter((doc) => doc.docDecNum !== docDecNum);
    }
    // editCard(groupId: string) {
    //     try {
    //         this.socket.emit('EditCard', { card: { _id: this._id, message: this.message, todos: this.todos }, groupId });
    //         this.clearCard();
    //     } catch (e: any) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

}

export default NewDocController;