import UserService from "../service/user-service";
import { validationResult } from "express-validator";
import ApiError from "../exeptions/api-error";
import userService from "../service/user-service";
import cardService from "../service/card-service";
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
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'Strict'});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'Strict' });
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
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'Strict' });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    // async getUserCards(req, res, next) {
    //     try {
    //         res.json(await cardService.getUserCards(req.user._id)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async getUser(req, res, next) {
    //     try {
    //         res.json(await userService.getUser(req.user._id)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async postCard (req, res, next) {
    //     try {
    //         res.json(await cardService.postNewCard(req.user._id, req.body.message, req.body.todos)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async editCard (req, res, next) {
    //     try {
    //         res.json(await cardService.editCard(req.user._id, req.body._id, req.body.message, req.body.todos)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async removeCompletedCards (req, res, next) {
    //     try {
    //         res.json(await cardService.removeCompletedCards(req.user._id)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async checkCard (req, res, next) {
    //     try {
    //         res.json(await cardService.checkCard(req.user._id, req.body.cardId, req.body.isCompleted)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async removeOneCard (req, res, next) {
    //     try {
    //         res.json(await cardService.removeOneCard(req.user._id, req.body.cardId)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async removeTodo (req, res, next) {
    //     try {
    //         res.json(await todoService.removeTodo(req.user._id, req.body.cardId, req.body.todoId)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    // async checkTodo (req, res, next) {
    //     try {
    //         res.json(await todoService.checkTodo(req.user._id, req.body.cardId, req.body.todoId)); 
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export default new userController();