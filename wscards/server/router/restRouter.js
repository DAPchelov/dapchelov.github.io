import { Router } from "express";
import userController from "../controllers/auth-controller.js";
import { body } from 'express-validator';

const restRouter = new Router();

restRouter.post('/registration',
    // body('email').isEmail(),
    body('password').isLength({min:3, max: 32}),
    userController.registration
);
restRouter.post('/login', userController.login);
restRouter.post('/logout', userController.logout);
restRouter.get('/activate/:link', userController.activate);
restRouter.get('/refresh', userController.refresh);

export default restRouter;