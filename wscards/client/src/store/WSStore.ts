import { makeAutoObservable } from 'mobx';
import { IGroup } from '../models/IGroup';

import NewCardController from './NewCardController';
import NewGroupController from './NewGroupController';
import NewDocController from './NewDocController';
import WSAuthController from './WSAuthController';
import WSUserController from './WSUserController';

class WSStore {

    private isCompletedDisplayMode: boolean | undefined = undefined;

    authController: WSAuthController = new WSAuthController();
    userController: WSUserController = new WSUserController(this.authController.socket);
    newCard: NewCardController = new NewCardController(this.authController.socket);
    newGroup: NewGroupController = new NewGroupController (this.authController.socket);
    newDoc: NewDocController = new NewDocController('', '', '', '', '', '', this.authController.socket);


    constructor() {
        makeAutoObservable(this);
    }

    setIsCompletedDisplayMode(mode: boolean | undefined) {
        this.isCompletedDisplayMode = mode;
    }
    getIsCompletedDisplayMode() {
        return this.isCompletedDisplayMode;
    }
};
export default WSStore;