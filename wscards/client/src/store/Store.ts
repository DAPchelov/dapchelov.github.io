import { makeAutoObservable } from 'mobx';

import CardController from './CardController';
import GroupController from './GroupController';
import DocController from './DocController';
import AuthController from './AuthController';
import UserController from './UserController';

class WSStore {

    private isCompletedDisplayMode: boolean | undefined = undefined;

    authController: AuthController = new AuthController();
    userController: UserController = new UserController(this.authController.socket);
    cardController: CardController = new CardController(this.authController.socket);
    groupController: GroupController = new GroupController (this.authController.socket);
    docController: DocController = new DocController('', '', '', '', '', '', this.authController.socket);


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