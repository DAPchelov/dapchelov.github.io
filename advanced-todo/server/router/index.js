import { Router } from "express";
import userController from "../controllers/user-controller";
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.post('/posttodo', authMiddleware, userController.postTodo);
router.post('/setcompleted', authMiddleware, userController.setTodoCompleted);
router.get('/todos', authMiddleware, userController.getUserTodos);
router.get('/removecompleted', authMiddleware, userController.removeCompletedTodos);
router.get('/user', authMiddleware, userController.getUser);

export default router;