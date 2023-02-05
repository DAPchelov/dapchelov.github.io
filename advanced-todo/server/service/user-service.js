import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import MailService from './mail-service'
import TokenService from './token-service'
import UserDto from '../dtos/user-dto'
import ApiError from '../exeptions/api-error'
import TodoListModel from '../models/todoList-model';
import TodosDto from '../dtos/todo-dto';

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        const userDto = new UserDto(user);

        TodoListModel.create({userId: userDto._id, todos: []});

        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }
    async activation(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }
    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Некорректный пароль')
        }
        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnautorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnautorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async getUserTodos(reqUserId) {
        const todoList = await TodoListModel.findOne({ userId: reqUserId });
        const todoListDto = new TodosDto(todoList);

        return { todos: todoListDto.todos }
    }
    async getUser(userId) {
        return await UserModel.findById(userId);
    }
}

export default new UserService();