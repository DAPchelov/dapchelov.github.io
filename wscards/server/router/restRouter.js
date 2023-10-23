import { Router } from "express";
import userController from "../controllers/auth-controller";
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

const restRouter = new Router();

restRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max: 32}),
    userController.registration
);
restRouter.post('/login', userController.login);
restRouter.post('/logout', userController.logout);
restRouter.get('/activate/:link', userController.activate);
restRouter.get('/refresh', userController.refresh);

// restRouter.post('/postcard', authMiddleware, userController.postCard);
// restRouter.post('/editcard', authMiddleware, userController.editCard);
// restRouter.post('/checkcard', authMiddleware, userController.checkCard);
// restRouter.post('/removecompleted', authMiddleware, userController.removeCompletedCards);
// restRouter.post('/removeonecard', authMiddleware, userController.removeOneCard);

// restRouter.post('/removetodo', authMiddleware, userController.removeTodo);
// restRouter.post('/checktodo', authMiddleware, userController.checkTodo);

// restRouter.get('/cards', authMiddleware, userController.getUserCards);
// restRouter.get('/user', authMiddleware, userController.getUser);

export default restRouter;