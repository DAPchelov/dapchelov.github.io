class DocDto {
    _id;
    creatorId;
    docDecNum;
    docName;
    prodName;
    folderNum;

    constructor(model) {
        this._id = model._id;
        this.creatorId = model.creatorId;
        this.docDecNum = model.docDecNum;
        this.docName = model.docName;
        this.prodName = model.prodName;
        this.folderNum = model.folderNum;
    };
};

export default DocDto;