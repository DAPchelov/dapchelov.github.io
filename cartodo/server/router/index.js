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

router.post('/postcard', authMiddleware, userController.postCard);
router.post('/setcompleted', authMiddleware, userController.setCardCompleted);
router.post('/removecompleted', authMiddleware, userController.removeCompletedCards);
router.post('/removeonecard', authMiddleware, userController.removeOneCard);
router.get('/cards', authMiddleware, userController.getUserCards);
router.get('/user', authMiddleware, userController.getUser);

export default router;