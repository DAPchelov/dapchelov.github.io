import ApiError from "../exeptions/api-error";
import tokenService from "../service/token-service";

const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        
        if (!authorizationHeader) {
            return next(ApiError.UnautorizedError());
        }

        const accesToken =authorizationHeader.split(' ')[1];
        if (!accesToken) {
            return next(ApiError.UnautorizedError());
        }

        const userData = tokenService.validateAccessToken(accesToken);
        if (!userData) {
            return next(ApiError.UnautorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnautorizedError());
    }
};

export default authMiddleware;