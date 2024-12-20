import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";

export interface IAddedDoc {
    _id: string,
    docDecNum: string,
}

interface IEditableDoc {
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

    constructor(_id: string, creatorId: string, docDecNum: string, docName: string, prodName: string, folderNum: string, socket: Socket) {

        this._id = _id;
        this.creatorId = creatorId;
        this.docDecNum = docDecNum;
        this.docName = docName;
        this.prodName = prodName;
        this.folderNum = folderNum;
        this.socket = socket;
        makeAutoObservable(this);

        this.socket.on('DocAdded', async (addedDoc: IAddedDoc) => {
            if (docDecNum === null) {
                alert('Ошибка, документ не добавлен');
            };
            if (docDecNum !== null) {
                this.addedDocs.length > 0 && this.filterAddedDocsById(addedDoc._id);
                this.addedDocs.push(addedDoc);
            };
        });
        this.socket.on('TakeEditableDoc', async (editableDoc: IEditableDoc) => {
            this.set_id(editableDoc._id);
            this.setCreatorId(editableDoc.creatorId);
            this.setDocDecNum(editableDoc.docDecNum);
            this.setDocName(editableDoc.docName);
            this.setProdName(editableDoc.prodName);
            this.setFolderNum(editableDoc.folderNum);
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
        const regDocDecNum = /^[А-Я]{1}[0-9А-Я]{1}.{1}[0-9А-Я]{1}.{1}[0-9]{3}[-0-9]{1}([0-9]{0,1})?([-]{0,1})?0$/;
        if (this.docDecNum.match(regDocDecNum)) {
            const newDocNum = Number(this.docDecNum.split('.')[1].split('-0')[0]) + 1;
            const docNum = this.docDecNum.split('.')[0] + '.' + newDocNum.toString() + '-0';
            this.docDecNum = docNum;
        } else {
            this.docDecNum = '';
        }
    }

    getEditableDoc(docId: string) {
        this.socket.emit('GetEditableDoc', { docId: docId })
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

            if (this.docDecNum.length === 0) {
                return (alert('Заполните обозначение документа'));
            }
            if (this.docName.length === 0) {
                return (alert('Заполните наименование документа'));
            }
            if (this.folderNum.length === 0) {
                return (alert('Заполните номер папки'));
            }

            this.socket.emit('PostDoc', { newDoc: newDoc, creatorId });
            this.docName = '';
            this.promtNextDocDecNum();

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

            if (this.docDecNum.length === 0) {
                return (alert('Заполните обозначение документа'));
            }
            if (this.docName.length === 0) {
                return (alert('Заполните наименование документа'));
            }
            if (this.folderNum.length === 0) {
                return (alert('Заполните номер папки'));
            }

            this.setDocDecNum('');
            this.setDocName('');
            this.setProdName('');
            this.setFolderNum('');

            this.socket.emit('EditDoc', { newDoc: editableDoc });

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    filterAddedDocsById(docId: string) {
        this.addedDocs = this.addedDocs.filter((doc) => doc._id !== docId);
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