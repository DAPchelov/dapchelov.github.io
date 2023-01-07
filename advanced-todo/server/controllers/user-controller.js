import UserService from "../service/user-service";
import { validationResult } from "express-validator";
import ApiError from "../exeptions/api-error";
import userService from "../service/user-service";
import todoService from "../service/todo-service";

class userController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activation(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUserTodos(req, res, next) {
        try {
            res.json(await userService.getUserTodos(req.user.id)); 
        } catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
            res.json(await userService.getUser(req.user.id)); 
        } catch (e) {
            next(e);
        }
    }
    async postTodo (req, res, next) {
        try {
            res.json(await todoService.postNewTodo(req.user.id, req.body.message)); 
        } catch (e) {
            next(e);
        }
    }
    async removeCompletedTodos (req, res, next) {
        try {
            res.json(await todoService.removeCompletedTodos(req.user.id)); 
        } catch (e) {
            next(e);
        }
    }
    async setTodoCompleted (req, res, next) {
        try {
            res.json(await todoService.setTodoCompleted(req.user.id, req.body.todoId, req.body.isCompleted)); 
        } catch (e) {
            next(e);
        }
    }
    async removeOneTodo (req, res, next) {
        try {
            res.json(await todoService.removeOneTodo(req.user.id, req.body.todoId)); 
        } catch (e) {
            next(e);
        }
    }
}

export default new userController();