import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import MailService from './mail-service.js'
import TokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exeptions/api-error.js'
import CardsListModel from '../models/cardsList-model.js';

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        // set isActivated in user-model default false if need activation by email
        // set socketId temporary uuid4 string to avoid collisions
        const user = await UserModel.create({ email, password: hashPassword, activationLink, socketId: uuidv4() });
        const userDto = new UserDto(user);

        CardsListModel.create({ userId: userDto._id, cards: [] });

        // turn on if need mail service
        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

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
            throw ApiError.AuthenticationTimeout();
        }

        const user = await UserModel.findById(userData._id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
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
        return (user.email);
    }
}

export default new UserService();