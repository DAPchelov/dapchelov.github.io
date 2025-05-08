import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import MailService from './mail-service.js'
import TokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exeptions/api-error.js'
import CardsListModel from '../models/cardsList-model.js';

class UserService {
    async registration(login, password) {
        const candidate = await UserModel.findOne({ login });
        if (candidate) {
            return ({ isAuth: false, userId: null, accessToken: null, refreshToken: null, cause: 'A user with this login is already registered' });
            // throw ApiError.BadRequest(`Пользователь с таким логином ${login} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        // set isActivated in user-model default false if need activation by login
        // set socketId temporary uuid4 string to avoid a collisions
        const userData = await UserModel.create({ login, password: hashPassword, activationLink, socketId: uuidv4() });
        const userDto = new UserDto(userData);

        CardsListModel.create({ userId: userData._id, cards: [] });

        // turn on if need mail service
        // await MailService.sendActivationMail(login, `${process.env.API_URL}/api/activate/${activationLink}`);

        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userData._id, tokens.refreshToken);

        return {
            isAuth: true,
            userId: userData._id,
            ...tokens,
            // user: userDto,
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
    async login(login, password) {
        const userData = await UserModel.findOne({ login });
        if (!userData) {
            return ({ isAuth: false, userId: null, accessToken: null, refreshToken: null, cause: 'Can`t find user' });
            // throw ApiError.BadRequest('Пользователь с таким login не найден')
        }
        const isPasswordEquals = await bcrypt.compare(password, userData.password);
        if (!isPasswordEquals) {
            return ({ isAuth: false, userId: null, accessToken: null, refreshToken: null, cause: 'Password is not correct' });
            // throw ApiError.BadRequest('Некорректный пароль')
        }
        const userDto = new UserDto(userData);

        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userData._id, tokens.refreshToken);

        return {
            isAuth: true,
            userId: userData._id,
            ...tokens,
            // user: userDto,
        }
    }
    async logout(refreshToken) {
        // const token = await TokenService.removeToken(refreshToken);
        // return token;
        await TokenService.removeToken(refreshToken);
        return ({ isAuth: false, userId: null, accessToken: null, refreshToken: null, cause: 'Refresh token is wrong' });
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            return ({ isAuth: false, userId: null, accessToken: null, refreshToken: null, cause: 'Refresh Token is null' });
            // throw ApiError.UnautorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            return ({ isAuth: false, userId: null, accessToken: null, refreshToken: null, cause: 'User data not valid or Refresh Token is expired' });
            // throw ApiError.AuthenticationTimeout();
        }

        const user = await UserModel.findById(userData._id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userData._id, tokens.refreshToken);

        // await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            isAuth: true,
            userId: userData._id,
            ...tokens,
            // user: userDto
        }
    }
    async getUser(userId) {
        return await UserModel.findById(userId);
    }
    async getAllUsers() {
        return await UserModel.find();
    }

    async setSocketId(userId, socketId) {
        await UserModel.updateOne({ _id: userId }, { $set: { socketId: socketId } });
    }
    async getUserEmail(userId) {
        const user = await UserModel.findById(userId);
        return (user.login);
    }
}

export default new UserService();